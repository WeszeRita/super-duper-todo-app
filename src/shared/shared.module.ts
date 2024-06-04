import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TodoFormComponent, HeaderComponent, EditableFieldComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CdkMenu, CdkMenuItemRadio, CdkMenuTrigger } from '@angular/cdk/menu';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    OverlayModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItemRadio,
  ],
  declarations: [
    HeaderComponent,
    TodoFormComponent,
    EditableFieldComponent,
    DropdownComponent,
  ],
  exports: [
    HeaderComponent,
    EditableFieldComponent,
    DropdownComponent,
  ],
})
export class SharedModule {}
