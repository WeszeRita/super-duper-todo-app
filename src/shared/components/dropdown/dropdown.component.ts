import { Component, Input } from '@angular/core';
import { SortTerm, Status } from '@shared';
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
  value: Status | SortTerm;

  @Input()
  name: IOption['value'];

  @Input()
  statusClass: Status;

  @Input()
  icon: string;

  @Input()
  options: IOption[];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  setStatus(value: Status | SortTerm, translatedValue: string): void {
    if (this.value !== value) {
      this.writeValue(value);
    }
    this.name = translatedValue;
  }

  writeValue(status: Status | SortTerm): void {
    this.value = status;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
