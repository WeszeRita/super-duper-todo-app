import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { FormatString } from './pipes/format-string';

@NgModule({
  declarations: [
    HeaderComponent,
    FormatString,
  ],
  exports: [
    HeaderComponent,
    FormatString,
  ],
  imports: [
    CommonModule,
  ],
})
export class SharedModule { }
