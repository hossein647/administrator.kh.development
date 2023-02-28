import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }


  create(body: any) {
    return this.http.post(`${this.baseApi}/question/create`, body, { withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }
  

  
  getAll() {
    return this.http.get(`${this.baseApi}/question/get/all`)
    .pipe(
      catchError(err => of(err))
    )
  }
  


  getAllPaginate(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/question/get/all/paginate`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }
  
  
  
  update(data: { id: string, title: string, answer: string}) {
    return this.http.put(`${this.baseApi}/question/update/${data.id}`, 
      { title: data.title, answer: data.answer }, 
      { withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }
  
  
  
  remove(id: string) {
    return this.http.put(`${this.baseApi}/question/remove/${id}`, { withCredentials: true })
    .pipe(
      catchError(err => of(err))
    )
  }
}
