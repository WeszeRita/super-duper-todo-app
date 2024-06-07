import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input()
  parentForm: FormGroup;

  @Input()
  fieldName: string;

  @Input()
  label: string;

  @Input()
  placeholder: string;

  value: string;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};


  get formFieldControl(): FormControl<string> {
    return this.parentForm.controls[this.fieldName] as FormControl;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  change(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;   // itt minden 3. nulla után közt is rakhatunk, vagy bármit manipulálhatunk
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  buildTranslationKey(relativeKey: string): string {
    return `addTodoForm.${ relativeKey }`;
  }
}
