import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo, Status } from '@shared';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input()
  todo: ITodo;

  pin(id: ITodo['id']): void {
    console.log(id);
  }

  delete(id: ITodo['id']): void {
    console.log(id);

  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-cards.${ relativeKey }`;
  }

  protected readonly Status = Status;
}
