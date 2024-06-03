import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { TodoActions } from './todo.actions';
import { ITodo } from '../../interfaces';
import { TodoService } from '../../services';

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
        mergeMap(({ todo }) => {
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
        mergeMap(({ todo }) => {
          return this.todoService.editTodo(todo)
            .pipe(
              map((todo: ITodo) => TodoActions.todoEdited({ todo })),
              catchError((error) => of(TodoActions.errorEditTodo({ error }))),
            );
        }),
      );
  });

  pinTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.pinTodo),
        mergeMap(({ id }) => {
          return this.todoService.pinTodo(id)
            .pipe(
              map(() => TodoActions.todoPinned({ id })),
              catchError((error) => of(TodoActions.errorPinTodo({ error }))),
            )
        })
      )
  })

  unpinnedTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.unpinTodo),
        mergeMap(({ id }) => {
          return this.todoService.unpinTodo(id)
            .pipe(
              map(() => TodoActions.todoUnpinned({ id })),
              catchError((error) => of(TodoActions.errorUnpinTodo({ error }))),
            )
        })
      )
  })

  removeTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.removeTodo),
        mergeMap((todo) => {
          const id = todo.id;
          return this.todoService.removeTodo(id)
            .pipe(
              map(() => TodoActions.todoRemoved({ id })),
              catchError((error) => of(TodoActions.errorRemoveTodo({ error }))),
            );
        }),
      );
  });

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
