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
  getData() {
    return this.store$.pipe(
      select(Selector.selectData)
    );
  }
  getAllData() {
    return this.store$.pipe(
      select(Selector.selectAllData)
    );
  }
}

