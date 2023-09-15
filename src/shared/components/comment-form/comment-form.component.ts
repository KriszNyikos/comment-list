import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Comment, CommentForm } from '../../interfaces';
import { TagSelectorInputComponent } from '../tag-selector-input/tag-selector-input.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit {
  @Input()
  comment?: Comment;

  @Input()
  availableTags: string[] = [];

  @Input()
  isCommentCreation = false;

  @Output()
  saveComment = new EventEmitter<Comment>();

  @Output()
  cancelSaving = new EventEmitter<void>();

  commentFormGroup: FormGroup<CommentForm>;

  get tagFormArray(): FormArray<FormControl<string>> {
    return this.commentFormGroup.controls['tags'];
  }

  get isInvalidForm(): boolean {
    return this.commentFormGroup.invalid || this.commentFormGroup.pristine;
  }

  @ViewChild('tagSelector', { static: true })
  private tagSelector: TagSelectorInputComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.commentFormGroup = this.fb.group<CommentForm>({
      text: this.fb.control(this.comment?.text || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      title: this.fb.control(this.comment?.title || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      tags: this.fb.array<FormControl<string>>([]),
    });

    this.comment?.tags.forEach((tag: string) => {
      this.tagFormArray.push(
        new FormControl<string>(tag, { nonNullable: true })
      );
    });
  }

  save(): void {
    if (this.isInvalidForm) {
      return;
    }

    this.saveComment.emit({
      ...this.commentFormGroup.value,
      id: this.comment?.id,
    } as Comment);
    this.commentFormGroup.reset();
    this.clearTagFormArray();
    this.tagSelector.resetInput();
  }

  cancel(): void {
    this.cancelSaving.emit();
    this.commentFormGroup.reset();
  }

  addNewTag(tag: string): void {
    this.tagFormArray.push(new FormControl<string>(tag, { nonNullable: true }));
    this.commentFormGroup.markAsDirty();
  }

  removeTagByIndex(index: number): void {
    this.tagFormArray.removeAt(index);
    this.commentFormGroup.markAsDirty();
  }

  trackBy(index: number, tagName: string): string {
    return tagName;
  }

  private clearTagFormArray(): void {
    this.tagFormArray.clear();
  }
}
