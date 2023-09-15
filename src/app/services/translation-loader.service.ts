import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationLoaderService {
  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en-US');
    this.translate.use('en-US');
  }

  loadTranslation(): Observable<any> {
    return this.http.get(`./assets/i18n/${this.translate.currentLang}.json`);
  }
}
