import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainPageSiteService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  create(body: any) {
    return this.http.post(`${this.baseApi}/main-page-site/create`, body, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }


  get() {
    return this.http.get(`${this.baseApi}/main-page-site/get`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
}
