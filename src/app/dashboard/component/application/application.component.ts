import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login/login.service';
import { surah } from 'src/app/shared/helper/verse';
import { ApplicationService } from './application.service';
import { SafeHTMLPipe } from './safe-html.pipe';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  cols: any[];
  tableData: any[] = [];
  buttonsLabel: any[];
  tabIndex = 0;
  currentRoute = '/dashboard/app';
  trashIcon = `<i class='pi pi-trash hover:text-red-500 hover:cursor-pointer'></i>`;
  editIcon = `<i class='pi pi-user-edit hover:text-blue-500 hover:cursor-pointer'></i>`;
  blockUser: boolean[] = [];
  superUser: boolean[] = [];
  selectedReciter: string;
  dataToRemove: any;
  showProgressCircular = false;
  label: { header: string, action: string, column: string };
  confirmDialog = false;
  newReciterENInput: string;
  newReciterFAInput: string;
  limit: number = 25;
  page: number = 1;
  totalDocs: number;
  totalPages: number;
  focusEnInput = false;
  focusFaInput = false;

  @ViewChild('newReciterFA') newReciterFA: NgModel;
  @ViewChild('newReciterEN') newReciterEN: NgModel;

  constructor(
    private loginService: LoginService,
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanetizer: DomSanitizer,
    private messageService: MessageService,
  ) {}



  ngOnInit(): void {
    this.isLogin();
    this.initToolbarTable();
    this.getReciters(this.page, this.limit); // default data table
    
    this.cols = this.reciterCols();
    this.router.navigate(['/dashboard/app']) // default route
  }
  
  
  
  isLogin() {
    this.loginService.hasCookie().subscribe(
      res => { 
        if (!res.loggedIn) this.router.navigate(['login']); 
      }
    )
  }



  initToolbarTable() {
    this.buttonsLabel = [
      { labelEN: 'reciter', labelFA: 'قاری' },
      { labelEN: 'translation', labelFA: 'ترجمه' },
      { labelEN: 'tafsir', labelFA: 'تفسیر' },
      { labelEN: 'user', labelFA: 'کاربر' }
    ];
  }



  reciterCols() {
    return [
      { field: 'num', header: '#' },
      { field: 'alias', header: 'نام' },
      { field: 'name', header: 'نام لاتین' },
      { field: 'surah', header: 'تعداد سوره' },
      { field: 'edit', header: 'ویرایش' },
      { field: 'remove', header: 'حذف' },
    ]
  }



  audioCols() {
    return [
      { field: 'num', header: '#' },
      { field: 'surah', header: 'نام سوره' },
      { field: 'remove', header: 'حذف' },
    ]
  }
  
  
  
  tafsirOrTranslateCols() {
    return [
      { field: 'num', header: '#' },
      { field: 'name', header: 'نام' },
      { field: 'author', header: 'مولف' },
      { field: 'remove', header: 'حذف' },
      
    ]
  }
  
  

  usersCols() {
    return [
      { field: 'num', header: '#' },
      { field: 'mobile', header: 'موبایل' },
    ]
  }



  onChangeTab(index: number) {  
    this.router.navigate(['/dashboard/app']);
    this.getCurrentRoute()
    this.tabIndex = index;    
    this.getDataTable(this.tabIndex);
    this.getColsTable(this.tabIndex);
  }


  
  getDataTable(index: number) {
    if (index === 0) this.getReciters(this.page, this.limit);
    if (index === 1) this.getTranslations(this.page, this.limit)
    if (index === 2) this.getTafsirs(this.page, this.limit);
    if (index === 3) this.getUsers(this.page, this.limit);
  }



  getColsTable(index: number) {
    if (index === 0) this.cols = this.reciterCols();
    if (index === 1 || index === 2) this.cols = this.tafsirOrTranslateCols()
    if (index === 3) this.cols = this.usersCols();
  }



  getReciters(page: number, limit: number) {
    this.applicationService.recitersPaginate(page, limit).subscribe(
      res => {
        if (res?.reciters) {          
          this.tableData = res.reciters.docs;
          this.totalDocs = res.reciters.totalDocs;
          this.totalPages = res.reciters.totalPages          
        }
      }
    )
  }



  getTranslations(page: number, limit: number) {
    this.applicationService.translationsPaginate(page, limit).subscribe(
      res => {
        if (res?.translations){
          this.tableData = res.translations.docs;
          this.totalDocs = res.translations.totalDocs;
          this.totalPages = res.translations.totalPages
        }
      }
    )
  }



  getTafsirs(page: number, limit: number) {
    this.applicationService.tafsirsPaginate(page, limit).subscribe(
      res => {        
        if (res?.tafsirs) {
          this.tableData = res.tafsirs.docs;
          this.totalDocs = res.tafsirs.totalDocs;
          this.totalPages = res.tafsirs.totalPages
        }
      }
    )
  }
  
  
  
  getUsers(page: number, limit: number) {
    this.blockUser = [];
    this.superUser = [];
    this.tableData = [];
    this.applicationService.usersPaginate(page, limit).subscribe(
      res => {          
        if (res?.users) {          
          this.tableData = res.users.docs;
          this.totalDocs = res.users.totalDocs;
          this.totalPages = res.users.totalPages
          
          this.tableData.forEach(user => {
            this.blockUser.push(user.block);            
            this.superUser.push(user.super);            
          })
        }
      }
    )
  }

  

  getAudios(reciter: string, page: number, limit: number) {      
    this.applicationService.audiosPaginate(reciter, page, limit).subscribe(
      res => {
        if (res) {                    
          if (res?.audios) {            
            this.tableData = res.audios.docs;
            this.totalPages = res.audios.totalPages;
            this.totalDocs = res.audios.totalDocs;
                   
            this.router.navigate(['details'], { relativeTo: this.activatedRoute });
            this.getCurrentRoute();
            this.cols = this.audioCols()
            this.selectedReciter = reciter;  
          }
        }
      }
    )
  }




  onTDTableClick(event: any, data: any, rowIndex: number) {    
    this.dataToRemove = { ...data, event, rowIndex}

    this.initConfirmDialog(event, data);
    this.showConfirmDialog(event, data);
    this.showDetailsReciter(event, data);
    
  }
  
  
  
  
  initConfirmDialog(event: any, data: any) {
    let item = '';
    let column = '';
    let action = '';
    if (event.target.classList.contains('pi-trash')) {
      if (data?.alias) item =  'حذف قاری';
      if (data?.reciter) item =  'حذف سوره';
      if (data?.super) item = 'حذف کاربر';
      if (data?.author && this.tabIndex === 1) item = 'حذف ترجمه';
      if (data?.author && this.tabIndex === 2) item = 'حذف تفسیر';  
      column = 'remove';
      action = 'حذف';
    } else {
      item = 'ویرایش نام قاری';
      column = 'edit';
      action = 'آپدیت';
    }
    this.label = { header: `آیا از ${item} مطمئن هستید ؟`, action, column };
  }




  showConfirmDialog(event: any, data: any) {    
    const editOrRemoveReciter = data?.surah === 0 && event.target.classList.contains('pi');
    const removeSurah = this.currentRoute.endsWith('details') && event.target.classList.contains('pi');
    if (this.tabIndex === 0) {      
      this.selectedReciter = data.name || data.reciter[0].name
      if (editOrRemoveReciter) this.confirmDialog = true;
      if (removeSurah) this.confirmDialog = true;
    } else {
      if (event.target.classList.contains('pi')) this.confirmDialog = true;
    }
  }



  showDetailsReciter(event: any, data: any) {
    const detailsReciter = event.target.classList.contains('td') && data?.surah > 0;        
    if (detailsReciter) return this.getAudios(this.selectedReciter, this.page, this.limit)
  }



  onRemoveAudio(prevRoute: boolean) {
    const numberOfSurah = surah(this.dataToRemove.surah)?.code;
    if (numberOfSurah) {
      this.applicationService.removeAudio(+numberOfSurah, this.selectedReciter).subscribe(
        res => {          
          if (res.audio) {
            if (prevRoute) this.backToPrevRoute();
            else this.getAudios(this.selectedReciter, this.page, this.limit);
  
            this.showProgressCircular = false;
            this.confirmDialog = false;
          }
        }
      );
    }
  }



  onRemoveTafsir(prevRoute: boolean) {
    this.applicationService.removeTafsir(this.dataToRemove.alias).subscribe(
      res => {
        if (res?.tafsir) {
          if (prevRoute) this.backToPrevRoute();
          else this.getTafsirs(this.page, this.limit);

          this.confirmDialog = false;
          this.showProgressCircular = false;
        }
      }
    ) 
  }



  onRemoveTranslation(prevRoute: boolean) {
    this.applicationService.removeTranslation(this.dataToRemove.alias).subscribe(
      res => {
        if (res?.translation) {
          if (prevRoute) this.backToPrevRoute();
          else this.getTranslations(this.page, this.limit);

          this.confirmDialog = false;
          this.showProgressCircular = false;
        }
      }
    )
  }



  onRemoveUser(prevRoute: boolean) {
    this.applicationService.removeUser(this.dataToRemove.mobile).subscribe(
      res => {
        if (res?.user) {
          if (prevRoute) this.backToPrevRoute();
          else this.getUsers(this.page, this.limit);

          this.showProgressCircular = false;
          this.confirmDialog = false;
        }
      }
    )
  }



  onUpdateReciter() {    
    if (this.newReciterENInput && this.newReciterFAInput) {      
      this.showProgressCircular = true;    
      this.applicationService.renameFolderReciter(this.selectedReciter, { en: this.newReciterENInput, fa: this.newReciterFAInput })
      .subscribe(
        res => {
          if (res?.reciter) {
            this.confirmDialog = false;
            this.showProgressCircular = false;
            this.getReciters(this.page, this.limit);
            this.newReciterEN.control.reset();
            this.newReciterFA.control.reset();
          }
        }
      )
    } else {
      this.newReciterEN.control.markAsTouched();
      this.newReciterFA.control.markAsTouched();
    }
  }



  onRemoveReciter() {
    this.showProgressCircular = true;    
    if (this.selectedReciter) {
      this.applicationService.removeReciter(this.selectedReciter).subscribe(
        res => {        
          if (res?.reciter) {
            this.getReciters(this.page, this.limit);
            this.showProgressCircular = false;
            this.confirmDialog = false;
          }
        }
      )
    }
  }

  

  getCurrentRoute() {
    this.router.events.subscribe(
      route => {
        if (route instanceof NavigationEnd) this.currentRoute = route.url;
      }
    )
  }



  onConfirm() {
    let prevRoute = false;
    if (this.tableData.length === 1) prevRoute = true;
    
    if (this.label.column === 'edit') return this.onUpdateReciter();
    if (this.label.column === 'remove') {
      if (this.tabIndex === 0 && this.currentRoute.endsWith('app')) return this.onRemoveReciter();
      if (this.tabIndex === 0 && this.currentRoute.endsWith('details')) return this.onRemoveAudio(prevRoute);
      if (this.tabIndex === 1) return this.onRemoveTranslation(prevRoute);
      if (this.tabIndex === 2) return this.onRemoveTafsir(prevRoute);
      if (this.tabIndex === 3) return this.onRemoveUser(prevRoute);
    }

  }




  cancel() {
    this.confirmDialog = false; 
    this.showProgressCircular = false;
    this.newReciterEN.control.reset();
    this.newReciterFA.control.reset();
  }



  backToPrevRoute() {
    this.getReciters(this.page, this.limit);
    this.cols = this.reciterCols();    
    this.router.navigate(['/dashboard/app']);
  }



  changeBlockUser(rowData: any, rowIndex: number) {     
    this.applicationService.blockState(rowData.mobile).subscribe(
      res => {
        if (res?.user) {     
          this.messageService.add({ severity: 'success', summary: 'با موفقیت آپدیت شد.' });   
          this.tableData.forEach(user => {
            if (user.mobile === rowData.mobile) this.blockUser[rowIndex] = res.user.block;
          })
        }
      }
    )
  }



  innerHtmlBindData(rowData: any, col: any, rowIndex: number, trashIcon: any) {
    return col.field === 'num' ? (((this.page * this.limit) - this.limit) + rowIndex + 1)
          : col.field === 'remove' && this.tabIndex !== 3
          ? new SafeHTMLPipe(this.sanetizer).transform(trashIcon)
          : col.field === 'edit'
          ? new SafeHTMLPipe(this.sanetizer).transform(this.editIcon)
          : rowData[col.field]
  }



  changeSuperUser(data: any, rowIndex: number) {
    this.applicationService.superState(data.mobile).subscribe(
      res => {
        if (res?.user) {
          this.messageService.add({ severity: 'success', summary: 'با موفقیت آپدیت شد.' });   
          this.tableData.forEach(user => {
            if (user.mobile === data.mobile) this.superUser[rowIndex] = res.user.super;
          })
        }
      }
    )
  }



  onPageChange(event: any) {    
    this.page = event.page + 1;
    this.limit = event.rows;
    this.totalPages = event.pageCount;
    
    if (this.tabIndex === 0) {
      if (this.currentRoute === '/dashboard/app')this.getReciters(this.page, this.limit);
      else this.getAudios(this.selectedReciter, this.page, this.limit)
    }
    else if (this.tabIndex === 1) this.getTranslations(this.page, this.limit);
    else if (this.tabIndex === 2) this.getTafsirs(this.page, this.limit);
    else this.getUsers(this.page, this.limit);
  }
}