import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState, todoAdapter } from './todo.reducers';
import { ITodo } from '../../interfaces/todo.interface';
import { normalize } from '../../utils/normalize.util';
import { SearchTermSelectors } from '../search';

export const todoFeatureKey = 'todos';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => todoAdapter.getSelectors().selectAll(state.todos),
  );

  export const orderedTodos = createSelector(
    selectTodos,
    (todos: ITodo[]) => {
      return todos.sort((a: ITodo, b: ITodo) => {
        return (+b.isPinned) - (+a.isPinned);
      });
    }
  );

  export const filteredTodos = () => createSelector(
    orderedTodos,
    SearchTermSelectors.selectSearchTerm,
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
