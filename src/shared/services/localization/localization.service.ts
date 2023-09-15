import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../enums';

@Injectable()
export class LocalizationService {
  constructor(private translate: TranslateService) {}

  toggleLanguage(): void {
    console.log(this.translate.currentLang);
    const language = this.translate.currentLang === Language.en ? Language.de : Language.en;
    this.translate.use(language);
  }
}
