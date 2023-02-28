import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLength: string;
  errorMessageLogin: string;
  errorGetCode = false;
  errorGetCodeMessage: string;
  error = false;
  showMobileNumberInput = true;
  mobileNumber: string;
  submitDisabled = false;


  constructor(
    private renderer: Renderer2,
    private loginService: LoginService,
    private router: Router,
  ) {
  }



  ngOnInit(): void {
    this.errorLength = 'شماره موبایل با 11 رقم وارد کنید.';
   
  }



  focusEnterMobile(mobile: any) {
    this.renderer.setStyle(mobile, 'direction', 'ltr');
    mobile.placeholder = '';
  }



  focusOutEnterMobile(mobile: any) {
    if (mobile.value === '') this.renderer.setStyle(mobile, 'direction', 'rtl');
    if(mobile.value.length !== 11) this.error = true;
    mobile.placeholder = 'شماره موبایل';
  }
  


  changeValueEnterMobile(mobile: string) {
    if (mobile.length === 11)  this.error = false;
    this.mobileNumber = mobile;
  }



  onSubmit(mobile: any) {       
    if (mobile.value?.length !==  11) this.error = true;
    else {
      this.error = false;
      this.errorGetCode = false;
      this.sendSMS(mobile)
    }
  }
  
  
  
  sendSMS(mobile: any) {
      mobile.blur();
      this.submitDisabled = true;
    this.loginService.getVerifyCode({ mobile: mobile.value }).subscribe(
      res => {
        console.log('get verify code : ', res);
        mobile.focus();
        this.submitDisabled = false;
        if (res.otpPass) this.showMobileNumberInput = false;
        else {
          if (res.statusCode === 500) {
            this.errorGetCode = true;
            this.errorGetCodeMessage = res.message;
          } else {
            this.errorGetCode = true;
            this.errorGetCodeMessage = 'دوباره تلاش کنید';
          }
        }
      }
    )
  }



  onLogin(sms: any) {
    let data;
    
    if (sms) data = { ...sms, mobile: this.mobileNumber}    
    console.log('sms : ', sms, data);
    this.loginService.login(data).subscribe(
      res => {
        
        if (res.statusCode === 200 && res.admin) {
          console.log('res login and redirect to dashboard', res);
          this.router.navigate(['dashboard'])
        } else {
          this.error = true;
          this.errorMessageLogin = res.message;
        }
      }
    )
  }



  editMobileNumber() {
    this.showMobileNumberInput = true;
    this.error = false;
  }


}
