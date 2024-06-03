import { Component, Input } from '@angular/core';
import { Status } from '@shared';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input()
  status: Status;

  statusValues = Object.values(Status);

  get statusClass(): Status {
    return Status[this.status];
  }

  setStatus(status: string): void {
    console.log(status);
  }

  buildTranslationKey(relativeKey: string): string {
    return `todo-card.${ relativeKey }`;
  }
}
