import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface IAddTodoForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit{
  form: FormGroup<IAddTodoForm>;

  constructor(public dialogRef: DialogRef<string>, private fb: FormBuilder) {}

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
    console.log(this.form.value);
    this.form.reset();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  buildTranslationKey(relativeKey: string): string {
    return `addTodoForm.${ relativeKey }`;
  }
}
