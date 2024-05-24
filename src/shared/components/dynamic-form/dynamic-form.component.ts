import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodo } from '../../interfaces';
import { Status } from '../../enums';
import { TodoFacadeService } from '../../services';

interface IAddTodoForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit{
  form: FormGroup<IAddTodoForm>;

  constructor(public dialogRef: DialogRef<string>, private fb: FormBuilder, private todoFacadeService: TodoFacadeService) {}

  get titleControl(): FormControl<string> {
    return this.form.controls.title;
  }

  get descriptionControl(): FormControl<string> {
    return this.form.controls.description;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  submit() {
    const newTodo: ITodo = {
      title: this.form.value.title,
      description: this.form.value.description,
      status: Status.todo,
      isPinned: false,
      createdAt: new Date().getTime(),
      updatedAt: null,
    }

    this.todoFacadeService.createNewTodo(newTodo);
    this.closeModal();
  }

  cancel() {
   this.closeModal();
  }

  closeModal () {
    this.form.reset();
    this.dialogRef.close();
  }

  buildTranslationKey(relativeKey: string): string {
    return `addTodoForm.${ relativeKey }`;
  }
}
