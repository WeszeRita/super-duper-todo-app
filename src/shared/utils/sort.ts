import { ITodo } from '../interfaces';
import { IStatusOrder, SortOption } from '../enums';

export function sort(todos: ITodo[], sortTermId: SortOption) {
  switch (sortTermId) {
    case SortOption.date:
      return [...todos].sort((a: ITodo, b: ITodo) => {
        return a.createdAt - b.createdAt;
      });

    case SortOption.status:
      return [...todos].sort((a: ITodo, b: ITodo) => {
        return IStatusOrder[a.status] - IStatusOrder[b.status];
      });

    case SortOption.name:
      return [...todos].sort((a, b) => {
        if (a.title === b.title) {
          return a.description.localeCompare(b.description);
        }
        return a.title.localeCompare(b.title);
      });

    default:
      return todos;
  }
}
