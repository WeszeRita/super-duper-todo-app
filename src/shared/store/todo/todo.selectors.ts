import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState, todoAdapter } from './todo.reducers';
import { ITodo } from '@shared';
import { normalize } from '../../utils/normalize.util';

export const todoFeatureKey = 'todos';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    todoAdapter.getSelectors().selectAll,
  );

  export const searchTerm = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.searchTerm,
  );

  export const filteredTodos = () => createSelector(
    selectTodos,
    searchTerm,
    (todos: ITodo[], searchTerm) => {
      if (!searchTerm) {
        return todos;
      }

      return todos.filter((todo) => {
        const title = normalize(todo.title);
        const description = normalize(todo.description);
        const searchString = normalize(searchTerm);

        return title.includes(searchString) || description.includes(searchString);
      });
    },
  );
}
