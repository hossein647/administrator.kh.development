import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Discount } from 'src/app/__interfaces/discount.interface';
import { DiscountService } from './discount.service';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  discount: Discount;
  newDiscountForm = false;
  cols: any[] = [];
  tableData: any[] = [];
  trashIcon = `<i class='pi pi-trash hover:text-red-500 hover:cursor-pointer'></i>`;
  @ViewChild('inputCode') inputCode: NgModel;
  @ViewChild('inputPrice') inputPrice: NgModel;
  @ViewChild('inputExpire') inputExpire: NgModel;
  showProgressCircular: boolean = false;
  discountId: string;

  constructor(
    private discoutnService: DiscountService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initCols();
    this.initForm();
    this.getDiscount();
  }


  initForm() {
    this.discount = { 
                      ...this.discount, 
                      placeholderCode: 'کد تخفیف', 
                      placeholderExpire: 'تعداد روز به عدد',
                      placeholderPrice: 'مبلغ تخفیف به تومان',
                    }
  }

  initCols() {
    this.cols = [
      { field: '#', header: '#' },
      { field: 'code', header: 'کد تخفیف' },
      { field: 'price', header: 'مبلغ تخفیف' },
      { field: 'expire', header: 'تاریخ انقضاء' },
      { field: 'remove', header: 'حذف' },
    ]
  }



  saveDiscount() {    
    if (this.discount.code && this.discount.expire && this.discount.price) {
      this.discoutnService.save(this.discount, this.discountId).subscribe(
        res => {
          if (res.discount) {            
            this.discount = { ...this.discount, code: '', expire: '', price: '' };
            this.tableData = [ res.discount ];
            this.discountId = res.discount._id;
            this.newDiscountForm = false;
            this.messageService.add({ severity: 'success', summary: 'با موفقیت ایجاد شد.' });
          }
          if (res.err) {
            this.messageService.add({ severity: 'error', summary: res.message || 'خطای ناگهانی رخ داده است' });
          }
        }
      )
    } else {
      this.markAsTouched();
    }
  }



  newDiscountCode() {
    this.newDiscountForm = true;
  }



  cancel() {
    this.newDiscountForm = false;
    this.resetInputs();
  }



  getDiscount() {
    this.showProgressCircular = true;
    this.discoutnService.get().subscribe(
      res => {
        if (res?.discount) {    
          this.showProgressCircular = false;      
          this.discountId = res.discount[0]?._id;
          this.convertDateToShamsi(res.discount[0]?.expire);          
          this.tableData = res.discount;
        }
      }
    )
  }



  convertDateToShamsi(date: string) {
    const dateArray = new Date(+date).toLocaleString('fa-IR', { dateStyle: 'full' }).split('')
    dateArray.splice(11, 1)
    const shamsi = dateArray.join('').split(' ')    
    return shamsi[3] + ' ' + shamsi[2] + ' ' + shamsi[1] + ' ' + shamsi[0];
  }



  onRemoveDiscount(code: string) {    
    this.discoutnService.remove(code).subscribe(
      res => {
        if (res.discount) {
          this.tableData = [];
          this.messageService.add({ severity: 'success', summary: 'با موفقیت حذف شد.' });
        }
      }
    )
  }


  resetInputs() {
    this.inputCode.control.reset();
    this.inputPrice.control.reset();
    this.inputExpire.control.reset();
  }
  
  
  markAsTouched() {
    this.inputCode.control.markAsTouched();
    this.inputPrice.control.markAsTouched();
    this.inputExpire.control.markAsTouched();
  }
}
