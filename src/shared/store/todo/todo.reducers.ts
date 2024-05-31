import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { ITodo } from '../../interfaces';
import { TodoActions } from './todo.actions';
import { createReducer, on } from '@ngrx/store';

export interface ITodoState extends EntityState<ITodo> {
  error: Error;
}

export const todoAdapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>();

export const initialState: ITodoState = todoAdapter.getInitialState({
  error: undefined,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.todoListLoaded, (state, { todos }) => {
    return todoAdapter.addMany(todos, state);
  }),
  on(TodoActions.todoCreated, (state, { todo }) => {
    return todoAdapter.addOne(todo, state);
  }),
  on(TodoActions.todoEdited, (state, { todo }) => {
    const update: Update<ITodo> = {
      id: todo.id,
      changes: { ...todo }
    };
    return todoAdapter.updateOne(update, state);
  }),
  on(TodoActions.todoPinned, (state, { id }) => {
    const update: Update<ITodo> = {
      id: id,
      changes: { isPinned: true }
    };
    return todoAdapter.updateOne(update, state);
  }),
  on(TodoActions.todoUnpinned, (state, { id }) => {
    const update: Update<ITodo> = {
      id: id,
      changes: { isPinned: false }
    };
    return todoAdapter.updateOne(update, state);
  }),
  on(TodoActions.todoRemoved, (state, { id }) => {
    return todoAdapter.removeOne(id, state);
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
