import {createSelector} from '@ngrx/store';
import {ICoreDataState} from './core.state';

export const selectGlobalState = (state => state);

export const selectCoreDataState = (state => state.core);
export const selectData = createSelector(selectCoreDataState, (state: ICoreDataState) => state.data);
export const selectCity = createSelector(selectCoreDataState, (state: ICoreDataState) => state.city && state.city.initial);
export const selectCategory = createSelector(selectCoreDataState, (state: ICoreDataState) => state.category && state.category.initial);
export const selectLoadingData = createSelector(selectCoreDataState, (state: ICoreDataState) => state.loading);
export const selectNormalizedData = createSelector(selectCoreDataState, (state: ICoreDataState) =>
  state.normalizedData
);
export const selectAllData = createSelector(selectCoreDataState, (state: ICoreDataState) => ({
  data: state.data,
  category: state.category,
  city: state.city
}));
