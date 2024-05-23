import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '@shared';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input()
  todo: ITodo;

  pin(id: string): void {
    console.log(id);
  }

  delete(id: string): void {
    console.log(id);
  }

  getClass(status: string): string {
    if (status === 'inProgress') {
      return 'in-progress';
    }
    return status;
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-cards.${ relativeKey }`;
  }
}
