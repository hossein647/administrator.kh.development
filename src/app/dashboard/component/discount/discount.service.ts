import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Discount } from 'src/app/__interfaces/discount.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  save(body: Discount, id: string) {
    return this.http.post(`${this.baseApi}/discount/create`, { ...body, id }, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  get() {
    return this.http.get(`${this.baseApi}/discount/get`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  remove(code: string) {
    return this.http.delete(`${this.baseApi}/discount/remove/${code}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
}
