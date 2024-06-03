import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFieldComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Output()
  confirm = new EventEmitter<void>();

  displayText = true;
  value: string;
  previousValue: string;

  private onChange: (value: string) => void = () => {
  };
  private onTouched: () => void = () => {
  };

  get hasChanges(): boolean {
    return this.value !== this.previousValue;
  }

  get isInvalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  constructor(
    @Self() @Optional() protected control: NgControl,
    private cd: ChangeDetectorRef,
  ) {
    this.control.valueAccessor = this;
  }

  toggleDisplay(): void {
    this.displayText = !this.displayText;
    this.cd.detectChanges();

    if (!this.displayText) {
      this.previousValue = this.value;
    }
  }

  cancel(): void {
    this.writeValue(this.previousValue);
    this.toggleDisplay();
  }

  save(): void {
    this.toggleDisplay();
    this.previousValue = this.value;
    this.confirm.emit();
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur(): void {
    this.onTouched();
  }

  updateValue(): void {
    this.writeValue(this.value);
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }
}
