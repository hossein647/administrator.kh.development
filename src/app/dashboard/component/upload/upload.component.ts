import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fullSureh } from 'src/app/shared/helper/verse';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit, OnDestroy {

  content: any;
  files: any[] = [];
  inputFile: HTMLInputElement;
  accept: string = '.zip'
  suar: any[] = [];
  reciters: any[] = []
  selectedReciter: string;
  selectedSurah: string;
  progressBar: number = 0;
  result: { server: number, liara: number } = { server: 0, liara: 0 };
  completeUpload = false;
  errorUpload = false;
  disabled =  false;
  translates: any[] = [];
  selectedTafsir: { type: string} = { type: '' };
  tafsirs: any[] = [];
  tafsirType: any[] = [ { type: 'رایگان' }, { type: 'نقدی' } ];
  selectedTab = 0;
  subscription = new Subscription();

  constructor(
    private uploadService: UploadService,
    private elRef: ElementRef,
  ) { 
    
  }
  
  
  ngAfterViewInit(): void {
    this.inputFile = this.elRef.nativeElement.querySelector('input[type=file]');    
    
  }
  


  ngOnInit(): void {
    this.getReciters();
    this.suar = fullSureh();

    this.translates = [
      { key: 'name', name: '', placeholder: 'نام ترجمه' },
      { key: 'author', author: '', placeholder: 'نام نویسنده' },
    ]
    this.tafsirs = [
      { key: 'name', name: '', placeholder: 'نام تفسیر' },
      { key: 'author', author: '', placeholder: 'نام نویسنده' },
    ]
    this.statusToolbarUpload(this.selectedTab)
  }
  


  uploadToServer(event: any) {
    this.resetBeforeUpload()
    const keyUpload = this.selectedTab === 0 ? 'sound' : this.selectedTab === 1 ? 'translation' : 'tafsir';
    if (this.checkFormValid()) this.upload(event, this.getFormData(), keyUpload);
  }



  upload(event: any, data: any, keyUpload: string) {  
    this.disabled = true;   
    this.uploadService.uploadFile(event.files[0], data, keyUpload).subscribe(
      res => {
        if (res) { 
          if (res.type === 1 && res.loaded && res.loaded) this.calculateProgress(res);
          if (res.type === 4 && res.body?.statusCode === 200) {
            this.completeUpload = true;
            this.resetAfterUpload();
          }
          this.checkUploadError(res);
        }
      }
    )
  }



  onChangeTranslate() {
    this.statusToolbarUpload(this.selectedTab);
  }
  
  
  onChagneTafsirType() {
    this.statusToolbarUpload(this.selectedTab);
  }



  onSelectedFile(event: any) {  
    this.getFormData()
    this.files = [];
    this.progressBar = 0;
    this.result = { server: 0, liara: 0 };
    this.files.push(event.currentFiles[0]);
    this.statusToolbarUpload(this.selectedTab);
    
  }

  

  onClearSelectedFile(event: any) {
    this.files = [];
    this.inputFile.value = '';
  }



  changeDropdown(selected: any) {    
    selected._id ? this.selectedReciter = selected : this.selectedSurah = selected;    
    this.statusToolbarUpload(this.selectedTab)
  }




  changeDropdownTafsir(selected: any) {    
    this.selectedTafsir = selected;
    this.statusToolbarUpload(this.selectedTab);
  }



  getReciters() {
    this.uploadService.reciters().subscribe(
      res => {
        if (res?.reciters) {
          this.reciters = res.reciters;
        }
      }
    )
  }



  getUploadEventToLiara() {    
    this.subscription = this.uploadService.getProgressUploadFromLiara().subscribe(
      res => {
        if (res.data) {     
          const data = JSON.parse(res.data);
          this.result.liara = data;
          if (this.result.liara !== this.result.server && this.result.liara !== 0 && this.result.server !== 0) {
            this.result.liara = Math.ceil(this.result.liara / 2);
          }
          this.progressBar = this.result.server + this.result.liara;
          
          this.errorUpload = false;
        } else {
          if (res.type === 'error') this.errorUpload = true;
        }
      }
    )
  }



  onChangeTab(event: any) {
    this.selectedTab = event.index;
    this.statusToolbarUpload(this.selectedTab);
    this.uploadFileType(this.selectedTab);
  }



  resetBeforeUpload(): void {
    this.progressBar = 0;
    this.completeUpload = false;
    this.errorUpload = false;
  }



  resetAfterUpload(): void {
    this.selectedReciter = '';
    this.selectedSurah = '';
    this.translates[0].name = ''
    this.translates[1].author = ''
    this.tafsirs[0].name = ''
    this.tafsirs[1].author = ''
    this.selectedTafsir = { type: ''};
    this.disabled = true;
  }



  checkFormValid() {
    const translate = this.translates[0].name && this.translates[1].author && this.files.length > 0;
    const reciter = this.selectedReciter && this.selectedSurah && this.files.length > 0;
    const tafsir = this.selectedTafsir.type && this.tafsirs[0].name && this.tafsirs[1].author && this.files.length > 0;
    
    if (this.selectedTab === 0) return reciter;
    if (this.selectedTab === 1) return translate;
    if (this.selectedTab === 2) return tafsir
  }



  getFormData(): any {
    const sound = {
      reciter: this.selectedReciter,
      audio: this.selectedSurah
    }

    const translate = {
      name: this.translates[0].name,
      author: this.translates[1].author,
    }

    const tafsir = {
      name : this.tafsirs[0].name,
      author: this.tafsirs[1].author,
      free: this.selectedTafsir.type === 'رایگان' ? true : false
    }    
    
    if (this.selectedTab === 0) return  sound;
    if (this.selectedTab === 1) return translate;
    if (this.selectedTab === 2) return tafsir
  }


  
  statusToolbarUpload(indexTab: number) {
    this.disabled = this.checkFormValid() && this.selectedTab === indexTab ? false : true;    
  }

  uploadFileType(indexTab: number) {
    this.accept = indexTab === 0 ? '.zip' : '.db';
  }


  calculateProgress(res: any) {
    const percent = Math.ceil((res.loaded / res.total * 100) / 2);
    this.result.server = percent;
    this.progressBar = this.result.server + this.result.liara;
    
    if (percent === 50) this.getUploadEventToLiara(); // upload to liara
  }


  checkUploadError(res: any) {
    const timeoutError = res?.body?.code === 'TimeoutError';
    const userNotFound = res?.error?.statusCode === 404;
    const networkingError = res?.body?.originalError?.code === 'NetworkingError';

    if (timeoutError || userNotFound || networkingError) this.errorUpload = true;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
