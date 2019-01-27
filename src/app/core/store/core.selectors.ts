import {createSelector} from '@ngrx/store';
import {ICoreDataState} from './core.state';

export const selectGlobalState = (state => state);

export const selectCoreDataState = (state => state.core);
export const selectCity = createSelector(selectCoreDataState, (state: ICoreDataState) => state.city);
export const selectCategory = createSelector(selectCoreDataState, (state: ICoreDataState) => state.category);
export const selectLoadingData = createSelector(selectCoreDataState, (state: ICoreDataState) => state.loading);
export const selectNormalizedData = createSelector(selectCoreDataState, (state: ICoreDataState) =>
  state.normalizedData
);
export const selectAllData = createSelector(selectCoreDataState, (state: ICoreDataState) => ({
  data: state.data,
  category: state.category,
  city: state.city
}));
export const selectFilter = createSelector(selectCoreDataState, (state: ICoreDataState) => state.filter);
export const selectFilteredData = createSelector(selectCoreDataState, (state: ICoreDataState) => state.filteredData);
