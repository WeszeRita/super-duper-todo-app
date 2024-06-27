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
  initialValue: string;

  @Input()
  options: IOption[];

  @Input()
  selectedOption: IOption;

  @Input()
  icon: string;

  placeholder: string;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  setStatus(value: string): void {
    if (this.initialValue !== value) {
      this.writeValue(value);
    }
    this.options.map((option: IOption) => {
      if (option.id === value) {
        this.selectedOption = option;
      }
    });
    this.placeholder =  this.selectedOption.value || this.initialValue;
  }

  writeValue(status: string): void {
    this.initialValue = status;
    this.onChange(this.initialValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
