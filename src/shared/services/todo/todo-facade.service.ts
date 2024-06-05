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

  createNewTodo(todo: Pick<ITodo, 'title' | 'description'>): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  editTodo(todo: Partial<ITodo>): void {
    this.store.dispatch(TodoActions.editTodo({ todo }));
  }

  pinTodo(id: ITodo['id']): void {
    this.store.dispatch(TodoActions.pinTodo({ id }));
  }

  unpinTodo(id: ITodo['id']): void {
    this.store.dispatch(TodoActions.unpinTodo({ id }));
  }

  removeTodo(id: ITodo['id']): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  searchTodo(searchTerm: string): void {
    this.store.dispatch(TodoActions.searchTodos({ searchTerm }));
  }


  getSearchedTodos(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.filteredTodos());
  }
}
