import { Injectable } from '@angular/core';
import { LocaleStorageService } from '../local-storage/locale-storage.service';
import { LocalStorageKey } from '../../enums';
import { Comment } from '../../interfaces';
import { Observable, delay, of } from 'rxjs';

@Injectable()
export class MockApiService {
  constructor(private localeStorageService: LocaleStorageService) {}

  getComments(): Observable<Comment[]> {
    const commentList = of(this.localeStorageService.getValue<Comment[]>(LocalStorageKey.comments) || []);

    return commentList.pipe(delay(1000));
  }

  changeComments(comments: Comment[]): Observable<Comment[]> {
    this.localeStorageService.setValue<Comment[]>(LocalStorageKey.comments, comments);

    const commentList = of(this.localeStorageService.getValue<Comment[]>(LocalStorageKey.comments) || []);

    return commentList.pipe(delay(1000));
  }
}
