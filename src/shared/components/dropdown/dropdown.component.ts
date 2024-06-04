import { Component, Input } from '@angular/core';
import { Status } from '@shared';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  statusValues: string[] = Object.keys(Status);

  @Input()
  status: Status;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get statusClass(): Status {
    return Status[this.status];
  }

  setStatus(status: string): void {
    if (this.status !== status) {
      this.writeValue(status);
    }
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

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }
}
