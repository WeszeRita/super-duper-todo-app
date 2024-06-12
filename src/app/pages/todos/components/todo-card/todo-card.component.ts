import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ITodo, Status, TodoFacadeService } from '@shared';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  statusControl: FormControl<Status>;

  @Input()
  todo: ITodo;

  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.statusControl = new FormControl<Status>(this.todo.status);

    this.statusControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.setStatus.bind(this));
  }

  setTitle(title: string): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, title } as Partial<ITodo>);
  }

  setDescription(description: string): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, description } as Partial<ITodo>);
  }

  setStatus(status: Status): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, status } as Partial<ITodo>);
  }

  togglePinned(): void {
    if (this.todo.isPinned) {
      this.todoFacadeService.unpinTodo(this.todo.id)
    } else {
      this.todoFacadeService.pinTodo(this.todo.id);
    }
  }

  delete(id: ITodo['id']): void {
    this.todoFacadeService.removeTodo(id);
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }
}
