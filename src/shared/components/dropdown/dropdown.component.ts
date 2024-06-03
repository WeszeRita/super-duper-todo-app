import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  statusValues: Status[] = Object.values(Status);

  @Input()
  status: Status;

  @Output()
  setNewStatus = new EventEmitter<Status>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get statusClass(): Status {
    return this.status;
  }

  setStatus(status: Status): void {
    if (this.status !== status) {
      this.writeValue(status);
      this.setNewStatus.emit(status);
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
