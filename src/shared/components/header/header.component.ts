import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(public dialog: Dialog) {}

  openDialog(): void {
    this.dialog.open(TodoFormComponent);
  }

  buildTranslationKey(relativeKey: string): string {
    return `header.${ relativeKey }`;
  }
}
