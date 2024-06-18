import { IOption, ITodo } from '../interfaces';
import { SortTerm,IStatusOrder } from '../enums';

export function sort(array: ITodo[], sortTermId: IOption['id']) {
  switch (sortTermId) {
    case SortTerm.date:
      return [...array].sort((a: ITodo, b: ITodo) => {
        return a.createdAt - b.createdAt;
      });

    case SortTerm.status:
      return [...array].sort((a: ITodo, b: ITodo) => {
        return IStatusOrder[a.status] - IStatusOrder[b.status];
      });

    case SortTerm.name:
      return [...array].sort((a: ITodo, b: ITodo) => {
        return a.title.localeCompare(b.title);
      });

    default:
      return [...array];
  }
}
