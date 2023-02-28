import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactUsService } from '../contact-us/contact-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  description: string;
  buttons: string[];
  @ViewChild('textarea') textArea: NgModel;
  contactId: string;
  disabled =  true;


  constructor(
    private contactService: ContactUsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAboutUs()
    this.buttons = ['ذخیره', 'ویرایش']
  }


  saveAboutUs() {
    console.log(this.description);
    
    if (this.description) {
      this.contactService.create({ id: this.contactId, aboutUs: this.description }).subscribe(
        res => {
          if (res?.contact) {
            this.description = res.contact.aboutUs;
            this.contactId = res.contact._id;
            this.disabled = true;
            this.messageService.add({ severity: 'success', summary: res.message });
          }
        }
        )
      } else {
      console.log('else');
      this.textArea.control.markAsTouched();
    }
  }


  editAboutUs() {    
    this.disabled = false;
  }


  getAboutUs() {
    this.contactService.get().subscribe(
      res => {
        if (res.contact) {
          this.description = res.contact.aboutUs;
          this.contactId = res.contact._id
        }
      }
    )
  }
}
