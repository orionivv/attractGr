import {Action} from '@ngrx/store';
import {IGetDataSuccessful, INormalizeData} from '../models/core.interface';

export enum CoreActionTypes {
  // ShowLoadingIndicator =  '[Core] Show Loading Indicator',
  // HideLoadingIndicator =  '[Core] Hide Loading Indicator',

  GetTestData =               '[Core] Get Test Data',
  GetTestDataSuccessful =     '[Core] Get Test Data Successful',
  GetTestDataFailure =        '[Core] Get Test Data Failure',

  NormalizeData =             '[Core] Normalize Data',
  NormalizeDataSuccessful =   '[Core] Normalize Data Successful',
  NormalizeDataFailure =      '[Core] Normalize Data Failure',

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


export type CoreActions =
  | GetTestData
  | GetTestDataSuccessful
  | GetTestDataFailure
  | NormalizeData
  | NormalizeDataSuccessful
  | NormalizeDataFailure
;
