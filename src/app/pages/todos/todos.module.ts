import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent, TodoCardComponent } from './components';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
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
