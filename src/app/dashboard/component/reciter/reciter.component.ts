import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ReciterService } from './reciter.service';

@Component({
  selector: 'app-reciter',
  templateUrl: './reciter.component.html',
  styleUrls: ['./reciter.component.scss']
})
export class ReciterComponent implements OnInit {

  reciters: any[] = [ 
    { placeholder: 'نام انگلیسی', value: ''},
    { placeholder: 'نام فارسی', value: ''}
  ]
  @ViewChildren('inputRef') inputRef: QueryList<NgModel>;

  
  constructor(
    private reciterService: ReciterService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }


  createReciter() {    
    if (this.reciters[0].value && this.reciters[1].value) {
      this.reciterService.createFolderReciter({ name: this.reciters[0].value, alias: this.reciters[1].value })
        .subscribe(
          res => {
            if (res.statusCode === 200) {
              this.inputRef.forEach(input => {
                input.control.reset();
              })
              this.messageService.add({ severity: 'success', summary: res.message });
            }
          }
        )
    } else {
      this.inputRef.forEach(input => {
        input.control.markAsTouched();
      })
    }
  }
}
