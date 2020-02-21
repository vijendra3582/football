import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

import { adminComponents } from './admin/pages';
import { AppComponent } from './app.component';

import { adminRoutes } from './admin/admin.routing';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { UIKitModule } from './ui-kit/ui-kit.module';

@NgModule({
  declarations: [
    AppComponent,
    ...adminComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UIKitModule,
    RouterModule.forRoot(adminRoutes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
