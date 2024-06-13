import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { ITodo } from '../../interfaces';
import { TodoActions } from './todo.actions';
import { createReducer, on } from '@ngrx/store';

export interface ITodoState {
  todos: EntityState<ITodo>;
  error: Error;
}

export const todoAdapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>();

export const initialState: ITodoState = {
  todos: todoAdapter.getInitialState({}),
  error: null,
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.todoListLoaded, (state, { todos }) => {
    return {
      ...state,
      todos: todoAdapter.addMany(todos, state.todos),
    };
  }),
  on(TodoActions.todoCreated, (state, { todo }) => {
    return {
      ...state,
      todos: todoAdapter.addOne(todo, state.todos),
    }
  }),
  on(TodoActions.todoEdited, (state, { todo }) => {
    const update: Update<ITodo> = {
      id: todo.id,
      changes: { ...todo }
    };
    return {
      ...state,
      todos: todoAdapter.updateOne(update, state.todos),
    }
  }),
  on(TodoActions.todoPinned, (state, { id }) => {
    const update: Update<ITodo> = {
      id: id,
      changes: { isPinned: true }
    };
    return {
      ...state,
      todos: todoAdapter.updateOne(update, state.todos),
    }
  }),
  on(TodoActions.todoUnpinned, (state, { id }) => {
    const update: Update<ITodo> = {
      id: id,
      changes: { isPinned: false }
    };
    return {
      ...state,
      todos: todoAdapter.updateOne(update, state.todos),
    }
  }),
  on(TodoActions.todoRemoved, (state, { id }) => {
    return {
      ...state,
      todos: todoAdapter.removeOne(id, state.todos),
    }
  }),
  on(
    TodoActions.errorLoadTodoList,
    TodoActions.errorCreateTodo,
    TodoActions.errorEditTodo,
    TodoActions.errorRemoveTodo,
    TodoActions.errorPinTodo,
    TodoActions.errorUnpinTodo,
    (state, action) => ({
      ...state,
      error: action.error,
    })),
);
