import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(public dialog: Dialog) {}

  openDialog() {
    this.dialog.open(DynamicFormComponent);
  }

  buildTranslationKey(relativeKey: string): string {
    return `header.${ relativeKey }`;
  }
}
