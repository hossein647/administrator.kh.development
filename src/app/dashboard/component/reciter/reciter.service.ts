import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReciterService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  createFolderReciter(body: { name: string, alias: string }) {
    return this.http.post(`${this.baseApi}/reciter/create`, body, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
}
