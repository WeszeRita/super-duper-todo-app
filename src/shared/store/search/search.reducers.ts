import { createReducer, on } from '@ngrx/store';
import { SearchActions } from './search.actions';

export interface ISearchState {
  searchTerm: string;
}

export const initialState: ISearchState = {
  searchTerm: undefined,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.search, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  }))
);
