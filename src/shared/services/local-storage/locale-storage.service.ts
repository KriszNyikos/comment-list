import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../enums';

@Injectable()
export class LocaleStorageService {
  setValue<T>(key: LocalStorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: LocalStorageKey): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
