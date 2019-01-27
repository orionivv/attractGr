import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as Action from './core.actions';
import {first, flatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
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
    map(({data, category, city}) => {
      const normalize = data.initial.map(el => ({
        ...el,
        city: city.entities[el.city],
        category: category.entities[el.category]
      }));
      return new Action.NormalizeDataSuccessful(normalize);
    })
  )
}
