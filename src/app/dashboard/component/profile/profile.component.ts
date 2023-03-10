import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  mobileNumber: string;
  oldMobileNumber: string;
  submitLabel: string = 'دریافت کد';
  sendedSMS = false;
  editable = false;
  verifyInput = false;
  errorGetCode: boolean;
  errorGetCodeMessage: string;
  counter: number = 120;
  countDown: Subscription | null;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    private messageService: MessageService,
  ) { }



  ngOnInit(): void {
    this.getAdmin();
  }



  onSendSMS(mobile: string) {
    this.errorGetCode = false;    
    this.loginService.getVerifyCode({ mobile }).subscribe(
      res => {
        if (res.otpPass) {
          this.sendedSMS = true;
          this.verifyInput = true;
        }
        else {
          if (res.statusCode === 500) {
            this.errorGetCode = true;
            this.errorGetCodeMessage = res.message;
            this.submitLabel = "آپدیت"

          } else {
            this.errorGetCode = true;
            this.errorGetCodeMessage = 'دوباره تلاش کنید';
          }
        }
      }
    )
  }



  onUpdateUserMobile(mobile: string) {
    const newMobile = mobile;
    this.profileService.updateAdminMobile(this.oldMobileNumber, newMobile).subscribe(
      res => {
        if (res.user) {
          this.mobileNumber = res.user.mobile;
          this.oldMobileNumber = res.user.mobile;
          this.editable = false;
          this.submitLabel = 'دریافت کد';
          this.messageService.add({ severity: 'success', summary: res.message });
        } 
        if (res.err) {
          this.messageService.add({ severity: 'error', summary: res.message });
        }
      }
    )
  }



  onCheckVerfyCode(sms: any) {
    const data = { ...sms, mobile: this.mobileNumber };
    this.errorGetCode = false;
    this.profileService.verifyAdmin(data).subscribe(
      res => {        
        if (res.verify) {
          this.verifyInput = false;
          this.sendedSMS = false;
          this.editable = true;
          this.submitLabel = 'آپدیت';
        }
        if (res?.expire || !res.verify) {
          this.errorGetCodeMessage = res.message;
          this.errorGetCode = true;
          this.sendedSMS = false;
        }
      }
    );
    // this.adminVerifyed = true;
  }


  cancelUpdate() {
    this.submitLabel = 'دریافت کد';
    this.sendedSMS = false;
    this.verifyInput = false;
    this.editable = false;
    // this.getAdmin();
  }



  getAdmin() {
    this.profileService.getAdmin().subscribe(
      res => {
        if (res.user) {
          this.oldMobileNumber = res.user.mobile;
          this.mobileNumber = res.user.mobile;
        }
      }
    )
  }



  getCounter(timer: any) {
    this.counter = timer.counter;
    this.countDown = timer.countDown;
  }
}
