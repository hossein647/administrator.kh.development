import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHTML'
})
export class SafeHTMLPipe implements PipeTransform {
  static transform: any;

  constructor(
    private sanetizer: DomSanitizer,
  ) {}
  transform(value: string): unknown {    
    return this.sanetizer.bypassSecurityTrustHtml(value)
  }

}
