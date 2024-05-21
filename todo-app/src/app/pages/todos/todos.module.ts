import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './components';
import { TodoCardComponent } from './components';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    TodoPageComponent,
    TodoCardComponent,
  ],
  exports: [
    TodoPageComponent,
  ],
})
export class TodosModule {}
