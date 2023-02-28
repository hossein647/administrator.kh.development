import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShareModule } from './shared/modules/share.module';
import { LoginService } from './login/login.service';
import { LoginResolver } from './login/login.resolver';

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    NotFoundComponent,
],
  imports: [
    ShareModule,
    DashboardModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService, LoginResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }