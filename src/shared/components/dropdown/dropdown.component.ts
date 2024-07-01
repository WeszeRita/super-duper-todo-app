import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOption } from '../../interfaces/option.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input()
  options: IOption[];

  @Input()
  icon: string;

  value: string;

  private onChange: (value: IOption) => void = () => {};
  private onTouched: () => void = () => {};

  setValue(option: IOption): void {
    this.writeValue(option);
  }

  writeValue(value: IOption): void {
    this.onChange(value);
    this.value = value.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
