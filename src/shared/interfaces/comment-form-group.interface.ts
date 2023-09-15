import { FormArray, FormControl } from '@angular/forms';

export interface CommentForm {
  title: FormControl<string>;
  text: FormControl<string>;
  tags: FormArray<FormControl<string>>;
}
