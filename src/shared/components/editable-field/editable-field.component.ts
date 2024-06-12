import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFieldComponent {
  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  value: string;

  @Output()
  confirm = new EventEmitter<string>();

  fieldControl: FormControl<string>;

  get hasChanges(): boolean {
    return this.fieldControl.value.trim() !== this.value.trim();
  }

  constructor(private cd: ChangeDetectorRef) {}

  enableEditing(): void {
    this.fieldControl = new FormControl<string>(this.value || '')
  }

  save(): void {
    this.value = this.fieldControl.value.trim();
    this.confirm.emit(this.value);
    this.resetField();
  }

  cancel(): void {
    this.resetField();
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }

  private resetField(): void {
    this.fieldControl = null;
    this.cd.detectChanges();
  }
}
