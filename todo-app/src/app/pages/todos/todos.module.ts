import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './components';
import { TodoCardComponent } from './components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    TodoPageComponent,
    TodoCardComponent,
  ],
  providers: [
    TranslateService,
  ],
  exports: [TodoPageComponent],
})
export class TodosModule {}
