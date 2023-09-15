import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Data, DataType } from '../../types'

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: any, type: DataType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl | undefined {
    switch (type) {
      case Data.Html:
        return this.domSanitizer.bypassSecurityTrustHtml(value || '');
      case Data.Style:
        return this.domSanitizer.bypassSecurityTrustStyle(value);
      case Data.Script:
        return this.domSanitizer.bypassSecurityTrustScript(value);
      case Data.Url:
        return this.domSanitizer.bypassSecurityTrustUrl(value);
      case Data.ResourceUrl:
        return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return undefined;
    }
  }
}
