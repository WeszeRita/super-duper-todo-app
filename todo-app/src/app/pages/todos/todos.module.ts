import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoPageComponent } from './components/todo-dashboard/todo-page.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';



@NgModule({
  declarations: [
    TodoPageComponent,
    TodoCardComponent,
  ],
  exports: [
    TodoPageComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class TodosModule { }
