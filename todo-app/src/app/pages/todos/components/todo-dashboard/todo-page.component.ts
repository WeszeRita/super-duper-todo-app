import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITodo, Status } from '../../../../../shared';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  todos: ITodo[] = [
    {
      id: '01',
      title: 'Learn for writing tests',
      description: 'Bla-bla-bla...',
      status: Status.inProgress,
      isPinned: false,
      createdAt: 628021800000,
      updatedAt: null,
    },
    {
      id: '02',
      title: 'Enjoy the long weekend',
      description: 'Bla-bla-bla...',
      status: Status.toDo,
      isPinned: false,
      createdAt: 628021800000,
      updatedAt: null,
    },
    {
      id: '03',
      title: 'Something important',
      description: 'Bla-bla-bla...',
      status: Status.done,
      isPinned: false,
      createdAt: 628021800000,
      updatedAt: null,
    }
  ]

  trackById(_, todo: ITodo): string {
    return todo.id;
  }
}
