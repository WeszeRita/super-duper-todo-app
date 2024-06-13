import { createAction, props } from '@ngrx/store';

const enum SearchAction {
  searchTodos = '[Search] Search todo',
}

export namespace SearchActions {
  export const searchTodos = createAction(SearchAction.searchTodos, props<{ searchTerm: string }>());
}
