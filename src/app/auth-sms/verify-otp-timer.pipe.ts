import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyOtpTimer'
})
export class VerifyOtpTimerPipe implements PipeTransform {

  //for MM:SS format
  transform(value: number, ...args: unknown[]): string {
    const minutes: number = Math.floor(value / 60);    
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);    
    
  }

}
