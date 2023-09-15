import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap, shareReplay } from 'rxjs';
import { Comment } from '../../interfaces';
import { CommentService } from '../../services';
import { filterCommentsByTag } from '../../utils';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  comments$: Observable<Comment[]>;
  availableTags$: Observable<string[]>;
  selectedTags$: Observable<string[]>;
  filteredComments$: Observable<Comment[]>;

  readonly isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.comments$ = this.commentService.getCommentLists()
      .pipe(shareReplay({ refCount: true }));

    this.selectedTags$ = this.commentService.getSelectedTags()
      .pipe(shareReplay({ refCount: true }));

    this.availableTags$ = this.commentService.getAvailableTags()
      .pipe(shareReplay({ refCount: true }));

    this.commentService.initComments();

    this.filteredComments$ = combineLatest([
      this.selectedTags$,
      this.comments$,
    ]).pipe(
      tap(() => this.finishLoading()),
      map(([tags, comments]) => filterCommentsByTag(comments, tags))
    );
  }

  removeComment(id: string): void {
    this.startLoading();
    this.commentService.removeComment(id);
  }

  changeComment(comment: Comment): void {
    this.startLoading();
    this.commentService.updateComment(comment);
  }

  createNewComment(comment: Comment): void {
    this.startLoading();
    this.commentService.addComment(comment);
  }

  filterTag(tag: string): void {
    this.commentService.toggleSelectedTag(tag);
  }

  trackBy(index: number, item: Comment): string {
    return item.id;
  }

  private startLoading(): void {
    this.isLoading$.next(true);
  }

  private finishLoading(): void {
    this.isLoading$.next(false);
  }
}
