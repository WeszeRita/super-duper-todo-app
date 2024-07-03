import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState, todoAdapter } from './todo.reducers';
import { ITodo } from '../../interfaces/todo.interface';
import { SearchTermSelectors } from '../search';
import { SortTermSelectors } from '../sorting';
import { search, sort } from '../../utils';
import { SortOption } from '@shared';

export const todoFeatureKey = 'todos';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => todoAdapter.getSelectors().selectAll(state.todos),
  );

  export const orderedTodos = createSelector(
    selectTodos,
    SearchTermSelectors.selectSearchTerm,
    SortTermSelectors.selectSortTermId,
    (todos: ITodo[], searchValue: string, sortOptionId: SortOption) => {
      let orderedTodos = search(todos, searchValue);
      orderedTodos = sort(orderedTodos, sortOptionId);

      const pinnedTodos = orderedTodos.filter((todo) => todo.isPinned);
      const unpinnedTodos = orderedTodos.filter((todo) => !todo.isPinned);

      return [...pinnedTodos, ...unpinnedTodos];
    },
  );
}
