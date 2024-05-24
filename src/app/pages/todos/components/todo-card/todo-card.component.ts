import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo, Status, TodoFacadeService } from '@shared';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  protected readonly Status = Status;

  @Input()
  todo: ITodo;

  constructor(private todoFacadeService: TodoFacadeService) {}

  togglePin(todo: ITodo): void {
    const editedTodo: ITodo = {
      ...todo,
      isPinned: !todo.isPinned,
    }
    this.todoFacadeService.editTodo(editedTodo);
  }

  delete(id: ITodo['id']): void {
    this.todoFacadeService.removeTodo(id);
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-cards.${ relativeKey }`;
  }
}
