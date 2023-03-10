import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Subscription, take, timer } from 'rxjs';
import { SMS } from '../__interfaces/sms.interface'

@Component({
  selector: 'app-auth-sms',
  templateUrl: './auth-sms.component.html',
  styleUrls: ['./auth-sms.component.scss']
})
export class AuthSmsComponent implements OnInit {
  error = false;
  verifyCode: string[];
  second = 1000;
  countDown: Subscription | null;
  counter: number = 120;
  @Output() sendRequest = new EventEmitter<any>();
  @ViewChildren('verifyCode') verifyCodeInput: QueryList<ElementRef>;


  constructor() { }



  ngOnInit(): void {
    this.OTPCounterTimer();
  }



  changeVerifyInput(parentInput: any, index: number) {
    this.error = false;
    const isLastElement = index + 1 === parentInput.children.length;
    const data: SMS = {
      mobile: '',
      otpPass: this.getValueFormVerify(),
      origin: 'adminPanel'
    }; 
       
    if (!isLastElement) parentInput.children[index].nextSibling.children[0].focus();
    else  {
      parentInput.children[index].children[0].blur()
      this.sendRequest.emit(data)
    }
  }



  getValueFormVerify() {
    this.verifyCode = [];
    this.verifyCodeInput.forEach(el => {
      if (el.nativeElement.value) this.verifyCode.push(el.nativeElement.value)
    });
    if (this.verifyCode.length === 6) return +this.verifyCode.join('')     
    return undefined;
  }



  OTPCounterTimer() {
    this.countDown = timer(0, this.second)
      .pipe(
        take(120)
      )
      .subscribe(() => --this.counter)
  }



  ngOnDestroy() {
    this.countDown?.unsubscribe();
  }
}
