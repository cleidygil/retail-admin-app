import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialDesignModule } from './components-iu/material-design.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './helpers/auth-interceptor.interceptor';
import { HeadersInterceptor } from './helpers/headers.interceptor';
import { RouterModule } from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DepotComponent } from './core/depot/depot.component';


@NgModule({
  declarations: [
    AppComponent,
    DepotComponent,
  
     ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialDesignModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, 
      useClass: HashLocationStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
