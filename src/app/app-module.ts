import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { FooterAdmin } from './layouts/admin-layout/footer-admin/footer-admin';
import { NavbarAdmin } from './layouts/admin-layout/navbar-admin/navbar-admin';
import { SidebarAdmin } from './layouts/admin-layout/sidebar-admin/sidebar-admin';
import { AdminModule } from './features/admin/admin-module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    App,
    AdminLayout,
    FooterAdmin,
    NavbarAdmin,
    SidebarAdmin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    RouterOutlet,
    
    
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
