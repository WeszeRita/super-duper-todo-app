import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from '../../interfaces';
import { TodoFacadeService } from '../../services';
import { IAddTodoForm } from '../../interfaces';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  form: FormGroup<IAddTodoForm>

  constructor(private dialogRef: DialogRef<string>, private fb: FormBuilder, private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  submit(): void {
    const newTodo: Pick<ITodo, 'title' | 'description'> = {
      title: this.form.value.title,
      description: this.form.value.description,
    }

    this.todoFacadeService.createNewTodo(newTodo);
    this.closeModal();
  }

  cancel(): void {
   this.closeModal();
  }

  closeModal(): void {
    this.form.reset();
    this.dialogRef.close();
  }

  buildTranslationKey(relativeKey: string): string {
    return `addTodoForm.${ relativeKey }`;
  }
}
