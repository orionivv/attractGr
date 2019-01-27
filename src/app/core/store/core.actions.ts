import {Action} from '@ngrx/store';
import {IFilterData, IGetDataSuccessful, INormalizeData} from '../models/core.interface';

export enum CoreActionTypes {

  GetTestData =               '[Core] Get Test Data',
  GetTestDataSuccessful =     '[Core] Get Test Data Successful',
  GetTestDataFailure =        '[Core] Get Test Data Failure',

  NormalizeData =             '[Core] Normalize Data',
  NormalizeDataSuccessful =   '[Core] Normalize Data Successful',
  NormalizeDataFailure =      '[Core] Normalize Data Failure',

  FilterData =                 '[Core] Filter Data',
  FilterDataSuccessful =       '[Core] Filter Data Successful',
  FilterDataFailure =          '[Core] Filter Data Failure',

  SetFilter =                  '[Core] Set Filter to LocalStorage',
  GetFilter =                  '[Core] Get Filter from LocalStorage',
  GetFilterSuccessful =        '[Core] Get Filter from LocalStorage Successful',
  GetFilterFailure =           '[Core] Get Filter from LocalStorage Failure',
}

export class GetTestData implements Action {
  readonly type = CoreActionTypes.GetTestData;
}
export class GetTestDataSuccessful implements Action {
  readonly type = CoreActionTypes.GetTestDataSuccessful;
  constructor(public payload?: IGetDataSuccessful) {}
}
export class GetTestDataFailure implements Action {
  readonly type = CoreActionTypes.GetTestDataFailure;
}

export class NormalizeData implements Action {
  readonly type = CoreActionTypes.NormalizeData;
}
export class NormalizeDataSuccessful implements Action {
  readonly type = CoreActionTypes.NormalizeDataSuccessful;
  constructor(public payload: Array<INormalizeData>) {}
}
export class NormalizeDataFailure implements Action {
  readonly type = CoreActionTypes.NormalizeDataFailure;
}

export class FilterData implements Action {
  readonly type = CoreActionTypes.FilterData;
}
export class FilterDataSuccessful implements Action {
  readonly type = CoreActionTypes.FilterDataSuccessful;
  constructor(public payload: Array<INormalizeData>) {}
}
export class FilterDataFailure implements Action {
  readonly type = CoreActionTypes.FilterDataFailure;
}

export class SetFilter implements Action {
  readonly type = CoreActionTypes.SetFilter;
  constructor(public payload: IFilterData) {}
}

export class GetFilter implements Action {
  readonly type = CoreActionTypes.GetFilter;
}
export class GetFilterSuccessful implements Action {
  readonly type = CoreActionTypes.GetFilterSuccessful;
  constructor(public payload: IFilterData) {}
}
export class GetFilterFailure implements Action {
  readonly type = CoreActionTypes.GetFilterFailure;
}



export type CoreActions =
  | GetTestData
  | GetTestDataSuccessful
  | GetTestDataFailure
  | NormalizeData
  | NormalizeDataSuccessful
  | NormalizeDataFailure
  | FilterData
  | FilterDataSuccessful
  | FilterDataFailure
  | SetFilter
  | GetFilter
;
