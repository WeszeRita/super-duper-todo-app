import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo, TodoFacadeService } from '@shared';
import { distinctUntilChanged, Observable, take } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  todos$: Observable<ITodo[]>;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  ngOnInit(): void {
    this.todoFacadeService.loadTodoList();
    this.todos$ = this.todoFacadeService.getTodoList()
      .pipe(
        distinctUntilChanged(),
        take(2),
      );
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-page.${ relativeKey }`;
  }

  trackById(_, todo: ITodo): string {
    return todo.id;
  }
}
