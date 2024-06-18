import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState, todoAdapter } from './todo.reducers';
import { ITodo } from '../../interfaces/todo.interface';
import { SearchTermSelectors } from '../search';
import { SortTermSelectors } from '../sorting';
import { search, sort } from '../../utils';
import { IOption } from '@shared';

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
    (todos: ITodo[], searchTerm: string, sortTermId: IOption['id']) => {
      let orderedTodos = search(todos, searchTerm);
      orderedTodos = sort(orderedTodos, sortTermId);

      const pinnedTodos = orderedTodos.filter((todo) => todo.isPinned);
      const unpinnedTodos = orderedTodos.filter((todo) => !todo.isPinned);

      return [...pinnedTodos, ...unpinnedTodos];
    },
  );
}
