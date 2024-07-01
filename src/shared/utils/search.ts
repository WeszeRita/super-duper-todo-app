import { ITodo } from '@shared';

export function search(todos: ITodo[], searchValue: string) {
  if (!searchValue) {
    return todos;
  }

  return todos.filter((todo: ITodo) => {
    return todo.title.trim().toLowerCase().includes(searchValue) || todo.description.trim().toLowerCase().includes(searchValue);
  });
}
