import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthSmsComponent } from 'src/app/auth-sms/auth-sms.component';
import { VerifyOtpTimerPipe } from 'src/app/auth-sms/verify-otp-timer.pipe';
import { KeyFilterModule } from 'primeng/keyfilter';



@NgModule({
  declarations: [
    AuthSmsComponent,
    VerifyOtpTimerPipe
  ],
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,

    
  ],
  exports: [
    InputTextareaModule,
    FormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    AuthSmsComponent,
    VerifyOtpTimerPipe,
    KeyFilterModule,

  ]
})
export class ShareModule { }
