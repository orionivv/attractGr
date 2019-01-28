import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as Action from './core.actions';
import {first, flatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {ICategory, ICity, IData} from '../models/core.interface';
import {CoreStoreService} from './core-store.service';
import {of} from 'rxjs';


@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private coreStoreService: CoreStoreService
  ) {
  }

  @Effect()
  GetTestData$ = this.actions$.pipe(
    ofType<Action.GetTestData>(Action.CoreActionTypes.GetTestData),
    switchMap(() => this.coreStoreService
      .getNormalizedData()
      .pipe(
        first()
      )
    ),
    switchMap(normalizedData => {
      if (normalizedData) {
        return of(new Action.GetTestDataSuccessful());
      } else {
        return of(null).pipe(
          switchMap(() => this.apiService.getAllDataFromApi()),
          flatMap((
            [{category}, {city}, {data}]
              : [{category: Array<ICategory>}, {city: Array<ICity>}, {data: Array<IData>}]) => {
            const dataFromApi = {
              category,
              city,
              data,
            };
            return [
              new Action.GetTestDataSuccessful(dataFromApi),
              new Action.NormalizeData()
            ];
          })
        );
      }
    })
  );

  @Effect()
  NormalizeData$ = this.actions$.pipe(
    ofType<Action.NormalizeData>(Action.CoreActionTypes.NormalizeData),
    switchMap(() => this.coreStoreService.getAllData().pipe(first())),
    flatMap(({data, category, city}) => {
      const normalize = data.ids.map(el => ({
        ...data.entities[el],
        city: city.entities[data.entities[el].city],
        category: category.entities[data.entities[el].category]
      }));
      return [
        new Action.NormalizeDataSuccessful(normalize),
        new Action.FilterData()
      ];
    })
  );

  @Effect()
  FilterData$ = this.actions$.pipe(
    ofType<Action.FilterData>(Action.CoreActionTypes.FilterData),
    withLatestFrom(
      this.coreStoreService.getFilter(),
      this.coreStoreService.getNormalizedData()
    ),
    map(([action, filter, data]) => {
      if (filter) {
        const filteredData = data.filter(el => {
          const city = filter.city
            ? el.city.id === filter.city
            : true;
          const category = filter.categories.length
            ? filter.categories.includes(el.category.id)
            : true;
          const price = el.price >= filter.minPrice && el.price <= filter.maxPrice;
          return city && category && price;
        });
        return new Action.FilterDataSuccessful(filteredData);
      }
      return new Action.FilterDataSuccessful(data);
    }),
  );

  @Effect({dispatch: false})
  SetFilter = this.actions$.pipe(
    ofType<Action.SetFilter>(Action.CoreActionTypes.SetFilter),
    map(action => action.payload),
    tap( filterData => {
      localStorage.setItem('filter', JSON.stringify(filterData));
    })
  );

  @Effect()
  GetFilter = this.actions$.pipe(
    ofType<Action.GetFilter>(Action.CoreActionTypes.GetFilter),
    map(() => {
      const data = JSON.parse(localStorage.getItem('filter'));
      if (data) {
        return new Action.GetFilterSuccessful(data);
      } else {
        const defaultFilter = {
          city: 0,
          categories: [],
          minPrice: 0,
          maxPrice: 250,
        };
        return new Action.GetFilterSuccessful(defaultFilter);
      }
    })
  );
}
