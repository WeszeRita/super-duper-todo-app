import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  placeholder: string;

  @Input()
  value: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get isInvalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  get isTouched(): boolean {
    return this.control ? this.control.touched : false;
  }

  constructor(
    @Self() @Optional() protected control: NgControl,
  ) {
    this.control.valueAccessor = this;
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
