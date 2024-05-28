import { createAction, props } from '@ngrx/store';
import { ITodo } from '@shared';

const enum TodoAction {
  loadTodoList = '[Todo] Load todo list',
  todoListLoaded = '[Todo] Todo list loaded',
  errorLoadTodoList = '[Todo] Load todo list error',

  createTodo = '[Todo] Create todo',
  todoCreated = '[Todo] Todo created',
  errorCreateTodo = '[Todo] Create todo error',

  editTodo = '[Todo] Edit todo',
  todoEdited = '[Todo] Todo edited',
  errorEditTodo = '[Todo] Edit todo error',

  removeTodo = '[Todo] Remove todo',
  todoRemoved = '[Todo] Todo removed',
  errorRemoveTodo = '[Todo] Remove todo error',
}

export namespace TodoActions {
  export const loadTodoList = createAction(TodoAction.loadTodoList);
  export const todoListLoaded = createAction(TodoAction.todoListLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodoList = createAction(TodoAction.errorLoadTodoList, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: Omit<ITodo, 'id'> }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorCreateTodo = createAction(TodoAction.errorCreateTodo, props<{ error: Error }>());

  export const editTodo = createAction(TodoAction.editTodo, props<{ todo: ITodo }>());
  export const todoEdited = createAction(TodoAction.todoEdited, props<{ todo: ITodo }>());
  export const errorEditTodo = createAction(TodoAction.errorEditTodo, props<{ error: Error }>());

  export const removeTodo = createAction(TodoAction.removeTodo, props<{ id: ITodo['id'] }>());
  export const todoRemoved = createAction(TodoAction.todoRemoved, props<{ id: ITodo['id'] }>());
  export const errorRemoveTodo = createAction(TodoAction.errorRemoveTodo, props<{ error: Error }>());
}
