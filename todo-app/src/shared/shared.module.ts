import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { FormatString } from './pipes/format-string';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
})
export class SharedModule { }
