import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './shared/modules/share.module';
import { LoginService } from './login/login.service';
import { LoginResolver } from './login/login.resolver';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    
],
  imports: [
    ShareModule,
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