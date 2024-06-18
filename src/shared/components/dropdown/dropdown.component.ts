import { Component, Input } from '@angular/core';
import { Status } from '@shared';
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
    }
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input()
  icon: string;

  @Input()
  status: string;

  @Input()
  statusClass: Status;

  @Input()
  name: string;

  @Input()
  options: IOption[];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};


  setStatus(statusId: string, translatedValue: string): void {
    if (this.status !== statusId) {
      this.writeValue(statusId);
    }
    this.name = translatedValue;
  }

  writeValue(status: any): void {
    this.status = status;
    this.onChange(this.status);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
