import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TodoFormComponent, HeaderComponent, EditableFieldComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    OverlayModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    HeaderComponent,
    TodoFormComponent,
    EditableFieldComponent,
  ],
  exports: [
    HeaderComponent,
    EditableFieldComponent,
  ],
})
export class SharedModule { }
