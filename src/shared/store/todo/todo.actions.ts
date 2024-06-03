import { createAction, props } from '@ngrx/store';
import { ITodo } from '../../interfaces';

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

  pinTodo = '[Todo] Pin Todo',
  todoPinned = '[Todo] Todo pinned',
  errorPinTodo = '[Todo] Pin todo error',

  unpinTodo = '[Todo] Unpin Todo',
  todoUnpinned = '[Todo] Todo unpinned',
  errorUnpinTodo = '[Todo] Unpin todo error',

  removeTodo = '[Todo] Remove todo',
  todoRemoved = '[Todo] Todo removed',
  errorRemoveTodo = '[Todo] Remove todo error',
}

export namespace TodoActions {
  export const loadTodoList = createAction(TodoAction.loadTodoList);
  export const todoListLoaded = createAction(TodoAction.todoListLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodoList = createAction(TodoAction.errorLoadTodoList, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: Pick<ITodo, 'title' | 'description'> }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorCreateTodo = createAction(TodoAction.errorCreateTodo, props<{ error: Error }>());

  export const editTodo = createAction(TodoAction.editTodo, props<{ todo: Partial<ITodo> }>());
  export const todoEdited = createAction(TodoAction.todoEdited, props<{ todo: ITodo }>());
  export const errorEditTodo = createAction(TodoAction.errorEditTodo, props<{ error: Error }>());

  export const pinTodo = createAction(TodoAction.pinTodo, props<{ id: ITodo['id'] }>());
  export const todoPinned = createAction(TodoAction.todoPinned, props<{ id: ITodo['id'] }>());
  export const errorPinTodo = createAction(TodoAction.errorPinTodo, props<{ error: Error }>());

  export const unpinTodo = createAction(TodoAction.unpinTodo, props<{ id: ITodo['id'] }>());
  export const todoUnpinned = createAction(TodoAction.todoUnpinned, props<{ id: ITodo['id'] }>());
  export const errorUnpinTodo = createAction(TodoAction.errorUnpinTodo, props<{ error: Error }>());

  export const removeTodo = createAction(TodoAction.removeTodo, props<{ id: ITodo['id'] }>());
  export const todoRemoved = createAction(TodoAction.todoRemoved, props<{ id: ITodo['id'] }>());
  export const errorRemoveTodo = createAction(TodoAction.errorRemoveTodo, props<{ error: Error }>());
}
