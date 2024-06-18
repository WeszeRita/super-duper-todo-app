import { ITodo } from '@shared';

export function search(array: ITodo[], searchTerm: string) {
  if (!searchTerm) {
    return array;
  }

  return array.filter((item: ITodo) => {
    return item.title.trim().toLowerCase().includes(searchTerm) || item.description.trim().toLowerCase().includes(searchTerm);
  });
}
