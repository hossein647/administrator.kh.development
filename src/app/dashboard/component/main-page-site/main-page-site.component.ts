import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MainPageSite } from 'src/app/__interfaces/main-page-site.interface';
import { MainPageSiteService } from './main-page-site.service';

@Component({
  selector: 'app-main-page-site',
  templateUrl: './main-page-site.component.html',
  styleUrls: ['./main-page-site.component.scss']
})
export class MainPageSiteComponent implements OnInit {

  buttons = ['ذخیره', 'ویرایش']
  mainPages : MainPageSite[];
  mainPageId: string;
  disabledButton = true;
  mainForm: FormGroup;


  constructor(
    private mainPageService: MainPageSiteService,
    private messageService: MessageService,
    private fbuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.getMainPage()
    this.mainPages = [
      { titleEN: 'title', titleFA: 'عنوان', link: '' },
      { titleEN: 'direct', titleFA: 'دانلود مستقیم', link: '' },
      { titleEN: 'googlePlay', titleFA: 'دانلود گوگل پلی', link: '' },
      { titleEN: 'bazar', titleFA: 'دانلود بازار', link: '' },
    ];
  }



  initForm() {
    this.mainForm = this.fbuilder.group({
      'title': [{ value: '', disabled: true }, Validators.required],
      'direct': [{ value: '', disabled: true }, Validators.required],
      'googlePlay': [{ value: '', disabled: true }, Validators.required],
      'bazar': [{ value: '', disabled: true }, Validators.required],
    })
  }



  saveMainPage() {    
    const formValue = { ...this.mainForm.value, id: this.mainPageId }
     if (this.isOneFieldFill()) {
         this.mainPageService.create(formValue).subscribe(
           res => {
             if (res?.mainPage) {
              this.disableForm();
              this.disabledButton = true;              
              this.mainPageId = res.mainPage._id;
               this.messageService.add({ severity: 'success', summary: res.message });
             }
           }
         )
     } else {
      this.markAsTouched();
     }
  }



  editMainPage() {
    this.enableForm();
    this.disabledButton = false;    
  }



  getMainPage() {
    this.mainPageService.get().subscribe(
      res => {        
        if (res?.mainPage) {
          this.mainPageId = res.mainPage._id;
          this.mainForm.patchValue(res.mainPage);
        }
      }
    )
  }



  enableForm() {
    this.mainForm.controls['title'].enable();
    this.mainForm.controls['direct'].enable();
    this.mainForm.controls['googlePlay'].enable();
    this.mainForm.controls['bazar'].enable();
  }



  disableForm() {
    this.mainForm.controls['title'].disable();
    this.mainForm.controls['direct'].disable();
    this.mainForm.controls['googlePlay'].disable();
    this.mainForm.controls['bazar'].disable();
  }
  
  
  
  markAsTouched() {
    this.mainForm.controls['title'].markAsTouched();
    this.mainForm.controls['direct'].markAsTouched();
    this.mainForm.controls['googlePlay'].markAsTouched();
    this.mainForm.controls['bazar'].markAsTouched();
  }



  isOneFieldFill() {
    return  this.mainForm.controls['title'].value ||
            this.mainForm.controls['direct'].value ||
            this.mainForm.controls['googlePlay'].value ||
            this.mainForm.controls['bazar'].value
  }
}
