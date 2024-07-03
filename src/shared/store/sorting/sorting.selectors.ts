import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISortTermState } from './sorting.reducers';

export const sortFeatureKey = 'sortTermId';

export namespace SortTermSelectors {
  const selectSortTermFeature = createFeatureSelector<ISortTermState>(sortFeatureKey);

  export const selectSortTermId = createSelector(
    selectSortTermFeature,
    (state: ISortTermState) => state.sortTermId,
  )
}
