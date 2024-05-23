import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions, TodoSelectors } from '../../store';
import { filter, Observable } from 'rxjs';
import { ITodo } from '../../interfaces';

@Injectable()
export class TodoFacadeService {

  constructor(private store: Store) {}

  loadTodoList(): void {
    this.store.dispatch(TodoActions.loadTodoList());
  }

  getTodoList(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.selectTodos)
      .pipe(filter(Boolean));
  }
}
