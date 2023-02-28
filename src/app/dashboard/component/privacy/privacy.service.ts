import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  save(body: { description: string }) {
    return this.http.post(`${this.baseApi}/privacy/create`, body, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  getAll() {
    return this.http.get(`${this.baseApi}/privacy/All`)
      .pipe(
        catchError(err => of(err))
      )
  }



  remove(id: string) {
    return this.http.delete(`${this.baseApi}/privacy/remove/${id}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
}
