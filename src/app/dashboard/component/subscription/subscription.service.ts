import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }



  create(amount: string, id: string) {
    return this.http.post(`${this.baseApi}/subscription/create`, { amount, id }, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
 
 
 
  get() {
    return this.http.get(`${this.baseApi}/subscription/get`)
      .pipe(
        catchError(err => of(err))
      )
  }
}
