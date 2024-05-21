import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { TodosModule } from './pages/todos/todos.module';
import { TranslationConfigModule } from '../shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    TodosModule,
    TranslationConfigModule,
    TranslateModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
