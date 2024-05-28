import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { InputType, ITodo, Status, TodoFacadeService } from '@shared';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEditTodoForm } from '@shared';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent implements OnInit {
  form: FormGroup<IEditTodoForm>;
  displayTitle = true;
  displayDescription = true;

  @Input()
  todo: ITodo;

  constructor(private todoFacadeService: TodoFacadeService, private fb: FormBuilder) {}

  get titleControl(): FormControl<string> {
    return this.form.controls.title;
  }

  get descriptionControl(): FormControl<string> {
    return this.form.controls.description;
  }

  get statusClass(): Status {
    return Status[this.todo.status];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.todo.title, Validators.required],
      description: [this.todo.description, Validators.required],
      isPinned: [this.todo.isPinned],
    });
  }

  editTodo(inputName: InputType, todo: ITodo): void {
    let editedTodo: ITodo;
    const now = new Date().getTime();

    if (inputName === 'inPinned') {
      editedTodo = {
        ...todo,
        isPinned: !todo.isPinned,
        updatedAt: now,
      };
      this.todoFacadeService.editTodo(editedTodo);
    } else {
      editedTodo = {
        ...todo,
        [inputName]: this.form.controls[inputName].value,
        updatedAt: now,
      };
      this.todoFacadeService.editTodo(editedTodo);
      this.form.controls[inputName].markAsPristine();
      this.toggleDisplay(inputName);
    }
  }

  cancel(inputName: Exclude<InputType, 'inPinned'>, todo: ITodo): void {
    this.form.controls[inputName].setValue(todo[inputName]);
    this.form.controls[inputName].markAsPristine();
    this.toggleDisplay(inputName);
  }

  delete(id: ITodo['id']): void {
    this.todoFacadeService.removeTodo(id);
  }

  toggleDisplay(inputName: Exclude<InputType, 'inPinned'>): void {
    if (inputName === 'title') {
      this.displayTitle = !this.displayTitle;
    }

    if (inputName === 'description') {
      this.displayDescription = !this.displayDescription;
    }
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }
}
