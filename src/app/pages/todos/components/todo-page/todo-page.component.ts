import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo, TodoFacadeService } from '@shared';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  todoList$: Observable<ITodo[]>;
  todoList: ITodo[];
  length: number;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  ngOnInit(): void {
    this.todoFacadeService.loadTodoList();
    this.todoList$ = this.getAttTodos();
  }

  getAttTodos() {
    return this.todoFacadeService.getTodoList()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      );
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-page.${ relativeKey }`;
  }

  trackById(_, todo: ITodo): ITodo['id'] {
    return todo.id;
  }
}
