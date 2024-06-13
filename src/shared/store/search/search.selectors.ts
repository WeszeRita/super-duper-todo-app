import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISearchState } from './search.reducers';

export const searchFeatureKey = 'searchTerm';

export namespace SearchTermSelectors {
  const selectSearchTermFeature = createFeatureSelector<ISearchState>(searchFeatureKey);

  export const selectSearchTerm = createSelector(
    selectSearchTermFeature,
    (state: ISearchState) => state.searchTerm,
  );
}
