import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tag-selector-input',
  templateUrl: './tag-selector-input.component.html',
  styleUrls: ['./tag-selector-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSelectorInputComponent implements OnInit, OnChanges {
  @Input()
  selectedTags: string[];

  @Input()
  allTags: string[];

  @Output()
  addNewTag = new EventEmitter<string>();

  tagFormControl: FormControl<string>;

  isOverlayOpened = false;

  get filteredTags(): string[] {
    return this.filteredTags$.value;
  }

  private readonly filteredTags$ = new BehaviorSubject<string[]>([]);

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private cd: ChangeDetectorRef,
    private alert: AlertService,
    private translate: TranslateService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allAvailableTag']) {
      this.filteredTags$.next(changes['allAvailableTag'].currentValue);
    }
  }

  ngOnInit(): void {
    this.tagFormControl = new FormControl<string>('', { nonNullable: true });

    if (this.allTags) {
      this.filteredTags$.next(this.allTags);
    }

    this.tagFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => {
        if (this.allTags && value) {
          this.filteredTags$.next(this.filterTags(value));
          this.isOverlayOpened = this.filteredTags.length > 0;
        } else {
          this.isOverlayOpened = false;
          this.cd.detectChanges();
        }
      });
  }

  saveTag(): void {
    if (!this.tagFormControl.value) {
      return;
    }

    const isNewTag = !this.isExistingTag(this.tagFormControl.value, this.selectedTags)

    if (isNewTag) {
      this.addNewTag.emit(this.tagFormControl.value);
    } else {
      this.alert.showAlert(this.translate.instant('form.existingTagError'));
    }

    this.resetInput();
    this.isOverlayOpened = false;
    this.cd.detectChanges();
  }

  selectTag(tag: string): void {
    this.tagFormControl.setValue(tag);
    this.isOverlayOpened = false;
    this.cd.detectChanges();
  }

  filterTags(input: string): string[] {
    return this.allTags.filter((text: string) => text.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
  }

  isExistingTag(newTag: string, allTags: string[]) {
    return allTags.includes(newTag);
  }

  trackBy(index: number, tagName: string): string {
    return tagName;
  }

  resetInput(): void {
    this.tagFormControl.reset();
  }
}
