import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { LocalizationService } from '@shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private localization: LocalizationService) {}

  toggleLanguage(): void {
    this.localization.toggleLanguage();
  }
}
