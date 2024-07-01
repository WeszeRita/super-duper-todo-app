import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOption } from '../../interfaces/option.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @HostBinding('class.open')
  private isOpen = false;

  constructor(private cd: ChangeDetectorRef) {}

  toggleDropdown(isOpen: boolean): void {
    this.isOpen = isOpen;
  }

  setValue(option: IOption): void {
    this.writeValue(option);
  }

  writeValue(value: IOption): void {
    this.onChange(value);
    this.value = value.value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
