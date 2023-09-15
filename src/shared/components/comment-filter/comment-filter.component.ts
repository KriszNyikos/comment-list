import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-filter',
  templateUrl: './comment-filter.component.html',
  styleUrls: ['./comment-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFilterComponent {
  @Input()
  availableTags: string[];

  @Input()
  selectedTags: string[];

  @Output()
  clickedFilterTag = new EventEmitter<string>();

  isTagSelected(selectedTags: string[] | null, tag: string): boolean {
    return !!selectedTags?.includes(tag);
  }

  filterTags(tag: string): void {
    this.clickedFilterTag.emit(tag);
  }

  trackBy(index: number, tagName: string): string {
    return tagName;
  }
}
