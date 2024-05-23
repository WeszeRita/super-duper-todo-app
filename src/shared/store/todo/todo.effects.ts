import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
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
              catchError((error) => of(TodoActions.errorLoadTodoList({ error: new Error(error) }))),
            );
        }),
      );
  });
  constructor(private actions$: Actions, private todoService: TodoService) {}
}
