import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shamsiDate'
})
export class ShamsiDatePipe implements PipeTransform {

  transform(value: number): string {
    const date = new Date(value).toLocaleString('fa-IR');    
    return date.replace('،', ' - ')
  }

}
