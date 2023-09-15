import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from './services';
import { AlertService } from './services';
import {
  CommentComponent,
  CommentFormComponent,
  CommentListComponent,
  CommentFilterComponent,
  TagSelectorInputComponent,
} from './components';
import {
  LocaleStorageService,
  CommentService,
  MockApiService,
} from './services';
import { SafePipe } from './pipes';

@NgModule({
  declarations: [
    CommentComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentFilterComponent,
    TagSelectorInputComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    TranslateModule
  ],
  providers: [
    LocaleStorageService,
    CommentService,
    MockApiService,
    LocalizationService,
    AlertService,
  ],
  exports: [
    CommentComponent,
    CommentFormComponent,
    CommentListComponent,
    CommentFilterComponent,
    TagSelectorInputComponent,
    SafePipe,
    TranslateModule,
  ],
})
export class SharedModule {}
