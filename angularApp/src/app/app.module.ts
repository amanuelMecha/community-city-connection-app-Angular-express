import { Tokeninterceptor } from './tokeninterceptor';
import { EnterceptorforTokenheaderInterceptor } from './enterceptorfor-tokenheader.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    HttpClientModule,

    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => {
          return import('./submodule/submodule.module').then((data) => {
            return data.SubmoduleModule;
          });
        },
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Tokeninterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
