import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared';
import { TodosModule } from './pages/todos/todos.module';
import { TodoService, TranslationConfigModule } from '@shared';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodoFacadeService } from '@shared';
import { TodoEffects, todoFeatureKey, todoReducer } from '../shared/store';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    TodosModule,
    TranslationConfigModule,
    TranslateModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(todoFeatureKey, todoReducer),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [TodoService, TodoFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
