import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TaskState } from './state/state/task.state';
import { TaskFormModule } from './features/task-form/task-form.module';
import { TaskBoardModule } from './features/task-board/task-board.module';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TaskFormModule,
    TaskBoardModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxsModule.forRoot([TaskState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }