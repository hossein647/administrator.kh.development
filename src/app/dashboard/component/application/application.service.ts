import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseApi = environment.url;

  constructor(
    private http: HttpClient,
  ) { }



  reciters() {
    return this.http.get(`${this.baseApi}/reciter/all`)
    .pipe(
      catchError(err => of(err))
    )
  }



  recitersPaginate(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/reciter/all/paginate`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }



  detailsReciter(reciter: string) {
    const params = new HttpParams().set('reciter', reciter)
    return this.http.get(`${this.baseApi}/audio/all`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }



  tafsirs() {
    return this.http.get(`${this.baseApi}/tafsir/all`)
    .pipe(
      catchError(err => of(err))
    )
  }



  tafsirsPaginate(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/tafsir/all/paginate`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }
  
  
  
  users(id: string) {
    return this.http.get(`${this.baseApi}/user/update/super/${id}`)
    .pipe(
      catchError(err => of(err))
    )
  }



  usersPaginate(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/user/all/paginate`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }
 
 
 
  superUsers() {
    return this.http.get(`${this.baseApi}/user/all-super`)
    .pipe(
      catchError(err => of(err))
    )
  }



  reciterSurah(nameReciter: string) {
    const params = new HttpParams().set('reciter', nameReciter)
    return this.http.get(`${this.baseApi}/reciter`, { params })
    .pipe(
      catchError(err => of(err))
    )
  }



  audios(reciter: string) {
    return this.http.get(`${this.baseApi}/audio/all/${reciter}`)
      .pipe(
        catchError(err => of(err))
      )
  }



  audiosPaginate(reciter: string, page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/audio/all/paginate/${reciter}`, { params })
      .pipe(
        catchError(err => of(err))
      )
  }



  translations() {
    return this.http.get(`${this.baseApi}/translation/all`)
      .pipe(
        catchError(err => of(err))
      )
  }



  translationsPaginate(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
    return this.http.get(`${this.baseApi}/translation/all/paginate`, { params })
      .pipe(
        catchError(err => of(err))
      )
  }
  


  removeAudio(surah: number, reciter: string) {
    const params = new HttpParams().set('reciter', reciter)
    return this.http.delete(`${this.baseApi}/audio/remove/${surah}`, { params, withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
  
  
  
  removeTranslation(alias: string) {
    return this.http.delete(`${this.baseApi}/translation/remove/${alias}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
  
  
  
  removeTafsir(alias: string) {
    return this.http.delete(`${this.baseApi}/tafsir/remove/${alias}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  removeUser(mobile: string) {
    return this.http.delete(`${this.baseApi}/user/remove/${mobile}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  blockState(mobile: string) {
    return this.http.get(`${this.baseApi}/user/update/block/${mobile}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }



  superState(mobile: string) {
    return this.http.get(`${this.baseApi}/user/update/super/${mobile}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
  
  

  //edit reciter name
  renameFolderReciter(oldName: string, updatedReciter: any) {
    return this.http.post(`${this.baseApi}/reciter/rename/${oldName}`, updatedReciter, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
  
  
  
  removeReciter(name: string) {
    return this.http.delete(`${this.baseApi}/reciter/remove/${name}`, { withCredentials: true })
      .pipe(
        catchError(err => of(err))
      )
  }
}
  

