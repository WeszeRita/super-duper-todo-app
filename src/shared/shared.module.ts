import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared'
import { TranslateModule } from '@ngx-translate/core';
import { DynamicFormComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    DynamicFormComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    OverlayModule,
    DialogModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
