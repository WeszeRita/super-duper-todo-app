import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchActions } from '../../store';

@Injectable()
export class SearchFacadeService {
  constructor(private store: Store) {}

  searchTodo(searchTerm: string): void {
    this.store.dispatch(SearchActions.searchTodos({ searchTerm }));
  }
}
