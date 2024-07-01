import { createReducer, on } from '@ngrx/store';
import { SortingActions } from './sorting.actions';
import { IOption, SortOption } from '@shared';

export interface ISortTermState {
  sortTermId: IOption['id'];
}

export const initialState: ISortTermState = {
  sortTermId: SortOption.date,
}

export const sortReducer = createReducer(
  initialState,
  on(SortingActions.sort, (state, { sortTermId }) => ({
    ...state,
    sortTermId,
  }))
);
