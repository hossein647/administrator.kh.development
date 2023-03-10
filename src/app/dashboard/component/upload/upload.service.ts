import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, of, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseApi = environment.url;

  private progressEvent = new Subject<any>();
  progressBar = 0;
  progress: EventSource;

  
  constructor(
    private http: HttpClient,
    private _ngZon: NgZone,
  ) {}


  uploadFile(file: File, data: any, path: string) {
    const option = JSON.stringify(data);
    
    const formData = new FormData();
    formData.append(path, file);
    formData.append('option', option);
    return this.http.post(`${this.baseApi}/upload/${path}`, formData, 
      { withCredentials: true, reportProgress: true, observe: 'events' })
      .pipe(
        catchError(err => of(err))
      )
  }



  reciters() {
    return this.http.get(`${this.baseApi}/reciter/all`)
      .pipe(
        catchError(err => of(err))
      )
  }



  getProgressUploadFromLiara() {
    this.progress = new EventSource(`${this.baseApi}/upload/event`, { withCredentials: true });    

    this.progress.onmessage = (event: MessageEvent) => {
      this._ngZon.run(() => {
        this.progressEvent.next(event); 
      })
    }
    

    this.progress.onerror = (event: Event) => {
      this._ngZon.run(() => {        
        this.progressEvent.next(event);
        this.progress.close();
      })
    }


    return this.progressEvent.pipe(
      catchError(err => throwError(() => err))
    );
  }

}
