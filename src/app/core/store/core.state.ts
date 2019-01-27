import {ICategory, ICity, IData, INormalizeData} from '../models/core.interface';

export interface ICoreState {
  core: ICoreDataState;
}

export interface ICoreDataState {
  normalizedData: entityData<INormalizeData>;
  data: entityData<IData>;
  category: entityData<ICategory>;
  city: entityData<ICity>;
  loading: boolean;
}

export const coreDataInitialState = {
  normalizedData: null,
  data: null,
  category: null,
  city: null,
  loading: false
};

export interface entityData<T> {
  ids: Array<string>;
  entities: any;
  initial: Array<T>;
}
