import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  newAmount: string;
  currentAmmount: number;
  idSubscription: string = '';
  @ViewChild('inputNewAmount') inputNewAmount: NgModel;

  constructor(
    private subscriptionService: SubscriptionService,
    private messageService: MessageService,
  ) { }



  ngOnInit(): void {
    this.getCurrentSubscription();
  }


  newSubscription() {
    if (this.newAmount) {      
      this.subscriptionService.create(this.newAmount, this.idSubscription).subscribe(
        res => {
          if (res.subscription) {
            this.inputNewAmount.reset();
            this.currentAmmount = res.subscription.amount;
            this.idSubscription = res.subscription._id;
            
            this.messageService.add({ severity: 'success', summary: 'با موفقیت ایجاد شد.' })
          }
          if (res.err) {
            this.messageService.add({ severity: 'error', summary: res.message || 'خطای ناگهانی رخ داده است.' })
          }
        }
      )
    } else {
      this.inputNewAmount.control.markAllAsTouched();
    }
  }



  getCurrentSubscription() {
    this.subscriptionService.get().subscribe(
      res => {
        if (res.amount) {
          this.currentAmmount = res.amount;
          this.idSubscription = res.id;
        }
      }
    )
  }
}
