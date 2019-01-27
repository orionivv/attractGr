import {ICategory, ICity, IData, IFilterData, INormalizeData} from '../models/core.interface';

export interface ICoreState {
  core: ICoreDataState;
}

export interface ICoreDataState {
  normalizedData: Array<INormalizeData>;
  filteredData: Array<INormalizeData>;
  data: entityData<IData>;
  category: entityData<ICategory>;
  city: entityData<ICity>;
  filter: IFilterData;
  loading: boolean;
}

export const coreDataInitialState = {
  normalizedData: null,
  filteredData: null,
  data: null,
  category: null,
  city: null,
  loading: false,
  filter: null
};

export interface entityData<T> {
  ids: Array<string>;
  entities: any;
}
