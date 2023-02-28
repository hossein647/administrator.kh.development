import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, of, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ByteConverterPipe } from './byte-converter.pipe';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  baseApi = environment.url;

  progressEvent = new Subject<any>();
  progressEvent$ = this.progressEvent.asObservable();
  progressBar = 0;
  progress: EventSource;
  
  constructor(
    private http: HttpClient,
    private byteConvertor: ByteConverterPipe,
    private _ngZon: NgZone,
  ) { }


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
    console.log('service');
    this.progress = new EventSource(`${this.baseApi}/upload/event`, { withCredentials: true });
    
    console.log('eventSourece : ', this.progress);
    

    this.progress.onmessage = (event: MessageEvent) => {
      console.log("on message progress : ", event)
      this._ngZon.run(() => {
        this.progressEvent.next(event); 
    })
  }
    

  this.progress.onerror = (event: Event) => {
    this._ngZon.run(() => {        
      this.progressEvent.next(event);
      this.progress.close();
      this.progressEvent.unsubscribe();
    })
  }


    return this.progressEvent$.pipe(
      catchError(err => throwError(() => err))
    );
  }
}
