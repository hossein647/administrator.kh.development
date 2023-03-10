import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrivacyService } from './privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  description: string;
  newPrivacy = false;
  cols: any[] = [];
  tableData: any[] = [];
  trashIcon = `<i class='pi pi-trash hover:text-red-500 hover:cursor-pointer'></i>`;
  privacyId: string;
  @ViewChild('textarea') textarea: NgModel;
  showProgressCircular: boolean = false;

  constructor(
    private messageService: MessageService,
    private privacyService: PrivacyService,
  ) { }

  ngOnInit(): void {
    this.initCols();
    this.getAllPrivacy();
  }



  initCols() {
    this.cols = [
      { field: '#', header: '#' },
      { field: 'description', header: 'توضیحات' },
      { field: 'remove', header: 'حذف' },
    ]
  }



  savePrivacy() {
    if (this.description) {
      this.privacyService.save({ description: this.description }).subscribe(
        res => {          
          if (res.privacy) {
            this.textarea.reset()
            this.tableData.push(res.privacy)
            this.newPrivacy = false;
            this.privacyId = res.privacy._id;
            this.messageService.add({ severity: 'success', summary: 'با موفقیت ایجاد شد.' });
          }
          if (res.err) {
            this.messageService.add({ severity: 'error', summary: res.message || 'خطای ناگهانی رخ داده است' });
          }
        }
      )
    } else {
      this.textarea.control.markAsTouched()
    }
  }



  newPrivacyCode() {
    this.newPrivacy = true;
  }


  cancel() {
    this.newPrivacy = false;
    this.textarea?.reset();
  }


  getAllPrivacy() {
    this.showProgressCircular = true;    
    this.privacyService.getAll().subscribe(
      res => {
        if (res?.privacies) {
          this.showProgressCircular = false;
          this.tableData = res.privacies;          
        }
      }
    )
  }



  onRemovePrivacy(id: string) {
    this.privacyService.remove(id).subscribe(
      res => {
        if (res.privacy) {
          const index = this.tableData.findIndex((item) => item._id === res.privacy._id)          
          this.tableData.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'با موفقیت حذف شد.' });
        }
      }
    )
  }
}
