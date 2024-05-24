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

  editTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.editTodo),
        switchMap(({ todo }) => {
          return this.todoService.editTodo(todo)
            .pipe(
              map((todo: ITodo) => TodoActions.todoEdited({ todo })),
              catchError((error) => of(TodoActions.errorEditTodo({ error }))),
            );
        }),
      );
  });

  removeTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.removeTodo),
        switchMap((action) => {
          const id = action.id;
          return this.todoService.removeTodo(id)
            .pipe(
              map(() => TodoActions.todoRemoved({ id })),
              catchError((error) => of(TodoActions.errorRemoveTodo({ error }))),
            );
        }),
      );
  });

  constructor(private actions$: Actions, private todoService: TodoService) {
  }
}
