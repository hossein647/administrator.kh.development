import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactUsService } from './contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  items: { titleEN: string, titleFA: string, link: string }[] = [];
  links: any[] = [];
  buttons: any[] = ['ذخیره', 'ویرایش'];
  contactId: string;
  disabledButton = true;
  contactForm: FormGroup;

  constructor(
    private contactService: ContactUsService,
    private messageService: MessageService,
    private fbulder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getContact()
    this.items = [
      { titleEN: 'email', titleFA: 'ایمیل', link: '' },
      { titleEN: 'telegram', titleFA: 'تلگرام', link: '' },
      { titleEN: 'whatsapp', titleFA: 'واتس اپ', link: '' },
      { titleEN: 'instagram', titleFA: 'اینستاگرام', link: '' },
    ]
  }
  
  
  initForm() {
    this.contactForm = this.fbulder.group({
      'email': [{ value: '', disabled: true }],
      'telegram': [{ value: '', disabled: true }],
      'whatsapp': [{ value: '', disabled: true }],
      'instagram': [{ value: '', disabled: true }],
    })
  }


  saveContact() {  
    const formValue = { ...this.contactForm.value, id: this.contactId };
    if (!this.isEmptyForm())     {
      this.contactService.create(formValue).subscribe(res => {
        if (res?.contact) {
          this.disabledForm();
          this.disabledButton = true;
          this.contactId = res.contact._id;
          this.contactForm.patchValue(res.contact)
          this.messageService.add({ severity: 'success', summary: res.message });
        }
      });
    } else {
      this.markAsTouch()
    }
  }



  editContact() {
    this.disabledButton = false;
    this.enabledForm();
  }



  getContact() {
    this.contactService.get().subscribe(res => {
      if (res?.contact) {
        this.contactForm.patchValue(res.contact);
        this.contactId = res.contact._id;
      }
    }); 
  }



  disabledForm() {
    this.items.forEach(item => {
      this.contactForm.controls[item.titleEN].disable()
    });
  }



  enabledForm() {
    this.items.forEach(item => {
      this.contactForm.controls[item.titleEN].enable()
    });
  }
  
  
  
  markAsTouch() {
    this.items.forEach(item => {
      this.contactForm.controls[item.titleEN].markAsTouched()
    });
  }


  isEmptyForm() {
    return !this.contactForm.controls['email'].value &&
          !this.contactForm.controls['whatsapp'].value &&
          !this.contactForm.controls['instagram'].value &&
          !this.contactForm.controls['telegram'].value
  }
}
