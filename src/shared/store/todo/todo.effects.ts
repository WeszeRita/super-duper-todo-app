import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { TodoActions } from './todo.actions';
import { ITodo, TodoService } from '@shared';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.loadTodoList),
        switchMap(() => {
          return this.todoService.getTodoList()
            .pipe(
              map((todos: ITodo[]) => TodoActions.todoListLoaded({ todos: todos })),
              catchError((error) => of(TodoActions.errorLoadTodoList({ error: error }))),
            );
        }),
      );
  });

  createTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.createTodo),
        switchMap(({ todo }) => {
          return this.todoService.createTodo(todo)
            .pipe(
              map((todo: ITodo) => TodoActions.todoCreated({ todo })),
              catchError((error: Error) => of(TodoActions.errorCreateTodo({ error }))),
            );
        }),
      );
  });

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
