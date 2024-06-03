import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IEditTodoForm, ITodo, TodoFacadeService } from '@shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  form: FormGroup<IEditTodoForm>;

  @Input()
  todo: ITodo;

  constructor(private todoFacadeService: TodoFacadeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.todo.title, Validators.required],
      description: [this.todo.description, Validators.required],
    });
  }

  editTodo(): void {
    this.todoFacadeService.editTodo({ id: this.todo.id, ...this.form.value } as Partial<ITodo>);
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
