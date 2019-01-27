import { Injectable } from '@angular/core';
import {Store, select} from '@ngrx/store';
// import {ICoreState} from './core.state';
import * as Action from './core.actions';
import * as Selector from './core.selectors';
import {ICoreDataState} from './core.state';

@Injectable({
  providedIn: 'root'
})
export class CoreStoreService {

  constructor(
    private store$: Store<ICoreDataState>
  ) { }

  private dispatchAction(action: Action.CoreActions) {
    this.store$.dispatch(action);
  }

  dispatchGetTestData() {
    this.dispatchAction(new Action.GetTestData());
  }
  dispatchSetFilter(data) {
    this.dispatchAction(new Action.SetFilter(data));
  }
  dispatchFilterData() {
    this.dispatchAction(new Action.FilterData());
  }
  dispatchGetFilter() {
    this.dispatchAction(new Action.GetFilter());
  }


  getLoadingDataStatus() {
    return this.store$.pipe(
      select(Selector.selectLoadingData)
    );
  }
  getNormalizedData() {
    return this.store$.pipe(
      select(Selector.selectNormalizedData)
    );
  }
  getCategory() {
    return this.store$.pipe(
      select(Selector.selectCategory)
    );
  }
  getCity() {
    return this.store$.pipe(
      select(Selector.selectCity)
    );
  }
  getAllData() {
    return this.store$.pipe(
      select(Selector.selectAllData)
    );
  }
  getFilter() {
    return this.store$.pipe(
      select(Selector.selectFilter)
    );
  }
  getFilteredData() {
    return this.store$.pipe(
      select(Selector.selectFilteredData)
    );
  }

}

