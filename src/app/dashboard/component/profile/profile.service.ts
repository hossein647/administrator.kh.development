import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { SMS } from 'src/app/__interfaces/sms.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  getAdmin() {
    return this.http.get(`${this.baseApi}/user/admin`, { withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }
  
  
  
  updateAdminMobile(mobile: string, newMobile: string) {
    const params = new HttpParams().set('newMobile', newMobile)
    return this.http.get(`${this.baseApi}/user/update/${mobile}`, { params, withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }



  verifyAdmin(sms: SMS) {    
    return this.http.post(`${this.baseApi}/user/verify-admin`, sms, { withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }
  
  
  
  sndSMS(mobile: string) { 
    return this.http.post(`${this.baseApi}/sms/send/`, mobile)
    .pipe(
      catchError(err => of(err))
    )
  }
}
