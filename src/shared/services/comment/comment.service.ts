import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { Comment } from '../../interfaces';
import { generateUniqueId } from '../../utils';
import { MockApiService } from '../mock-api/mock-api.service';

@Injectable()
export class CommentService {
  private readonly commentList$ = new BehaviorSubject<Comment[]>([]);
  private readonly availableTags$ = new BehaviorSubject<string[]>([]);
  private readonly selectedTags$ = new BehaviorSubject<string[]>([]);

  constructor(private mockApi: MockApiService) {}

  async initComments(): Promise<void> {
    const comments = await firstValueFrom(this.mockApi.getComments());

    this.setCommentsAndTags(comments);
  }

  getCommentLists(): Observable<Comment[]> {
    return this.commentList$;
  }

  getSelectedTags(): Observable<string[]> {
    return this.selectedTags$;
  }

  getAvailableTags(): Observable<string[]> {
    return this.availableTags$;
  }

  removeComment(id: string): void {
    const filteredComments = this.commentList$.value.filter((comment: Comment) => comment.id !== id);

    this.changeComments(filteredComments);
  }

  updateComment(updatedComment: Comment): void {
    const updatedComments = this.commentList$.value.map((comment: Comment) => {
      return comment.id === updatedComment.id ? updatedComment : comment;
    });

    this.changeComments(updatedComments);
  }

  addComment(newComment: Partial<Comment>): void {
    const extendedList = [
      ...this.commentList$.value,
      { ...newComment, id: generateUniqueId() } as Comment,
    ];
    this.changeComments(extendedList);
  }

  toggleSelectedTag(selectedTag: string): void {
    if (this.selectedTags$.value.includes(selectedTag)) {
      const filteredTags = this.selectedTags$.value.filter((tag: string) => tag !== selectedTag);

      this.selectedTags$.next(filteredTags);
    } else {
      this.selectedTags$.next([...this.selectedTags$.value, selectedTag]);
    }
  }

  private async changeComments(comments: Comment[]): Promise<void> {
    const allComments = await firstValueFrom(this.mockApi.changeComments(comments));

    this.setCommentsAndTags(allComments);
  }

  private setCommentsAndTags(comments: Comment[]): void {
    this.commentList$.next(comments);
    this.availableTags$.next(this.reduceTags(comments));
  }

  private reduceTags(commentList: Comment[]): string[] {
    const newTagList = commentList.reduce((acc: string[], comment: Comment) => {
      return [...acc, ...comment.tags];
    }, []);

    return [...new Set(newTagList)];
  }
}
