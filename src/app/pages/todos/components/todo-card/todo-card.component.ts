import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { IOption, ITodo, Status, TodoFacadeService } from '@shared';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  @Input()
  todo: ITodo;

  statusControl: FormControl<IOption>;
  options: IOption[] = [
    {
      id: Status.todo,
      value: this.translateService.instant(this.buildTranslationKey(Status.todo)),
    },
    {
      id: Status.inProgress,
      value: this.translateService.instant(this.buildTranslationKey(Status.inProgress)),
    },
    {
      id: Status.done,
      value: this.translateService.instant(this.buildTranslationKey(Status.done)),
    }
  ];

  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef, private translateService: TranslateService) {}

  ngOnInit(): void {
    const todo = this.options.find((option) => option.id === this.todo.status);
    this.statusControl = new FormControl<IOption>(todo);

    this.statusControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.setStatus.bind(this));
  }

  setTitle(title: ITodo['title']): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, title } as Partial<ITodo>);
  }

  setDescription(description: ITodo['description']): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, description } as Partial<ITodo>);
  }

  setStatus(option: IOption): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, status: option.id } as Partial<ITodo>);
  }

  togglePinned(): void {
    if (this.todo.isPinned) {
      this.todoFacadeService.unpinTodo(this.todo.id);
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
