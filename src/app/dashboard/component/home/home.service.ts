import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  getPrice() {
    return this.http.get(`${this.baseApi}/subscription/get`)
      .pipe(
        catchError(err => of(err))
      )
  }
  
  
  totalSales() {
    return this.http.get(`${this.baseApi}/pay/total`, { withCredentials: true })
      .pipe(
        catchError(err => throwError(() => err))
      )
  }
}
