import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SMS } from '../__interfaces/sms.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseApi = environment.url;
  emitToGetVerifyCode = new Subject();
  emitToGetVerifyCode$ = this.emitToGetVerifyCode.asObservable()

  constructor(
    private http: HttpClient,
  ) { }



  getVerifyCode(sms: SMS) {
    return this.http.post<SMS>(`${this.baseApi}/sms/send`, sms)
      .pipe(
        catchError(err => of(err))
      )
  }



  login(sms: SMS) {    
    return this.http.post<any>(`${this.baseApi}/user/auth`, sms, { withCredentials: true })
    .pipe(
      catchError(err => throwError(() => err))
    )
  }



  hasCookie() {
    return this.http.get(`${this.baseApi}/user/has-cookie`, { withCredentials: true })
    .pipe(
      catchError(err => of(err)),
    )
  }
  
  
  
  logout() {
    return this.http.get(`${this.baseApi}/user/logout`, { withCredentials: true })
    .pipe(
      catchError(err => of(err)),
    )
  }
}
