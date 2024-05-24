import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions, TodoSelectors } from '../../store';
import { Observable } from 'rxjs';
import { ITodo } from '../../interfaces';

@Injectable()
export class TodoFacadeService {

  constructor(private store: Store) {}

  loadTodoList(): void {
    this.store.dispatch(TodoActions.loadTodoList());
  }

  getTodoList(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.selectTodos);
  }

  createNewTodo(todo: ITodo): void {
    return this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  editTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.editTodo({ todo }));
  }

  removeTodo(id: ITodo['id']): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
}
