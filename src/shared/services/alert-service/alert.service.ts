import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
  showAlert(message: string): void {
    window.alert(message);
  }
}
