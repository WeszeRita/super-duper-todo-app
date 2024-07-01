import { createAction, props } from '@ngrx/store';

const enum SearchAction {
  search = '[Search] Search',
}

export namespace SearchActions {
  export const search = createAction(SearchAction.search, props<{ searchTerm: string }>());
}
