import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Comment } from '../../interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input()
  comment: Comment;

  @Input()
  availableTags: string[] = [];

  @Output()
  changeComment = new EventEmitter<Comment>();

  @Output()
  removeComment = new EventEmitter<string>();

  isEditing = false;

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  save(comment: Comment): void {
    this.changeComment.emit(comment);
    this.toggleEditing();
  }

  remove(): void {
    this.removeComment.emit(this.comment.id);
  }

  trackBy(index: number, tagName: string): string {
    return tagName;
  }
}
