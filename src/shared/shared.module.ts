import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TodoFormComponent, HeaderComponent, EditableFieldComponent } from './components';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { SearchComponent } from './components/search/search.component';
import { TextInputComponent } from './components/text-input/text-input.component';

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
    CdkMenuItem,
  ],
  declarations: [
    HeaderComponent,
    TodoFormComponent,
    EditableFieldComponent,
    DropdownComponent,
    SearchComponent,
    TextInputComponent,
  ],
  exports: [
    HeaderComponent,
    EditableFieldComponent,
    DropdownComponent,
  ],
})
export class SharedModule {}
