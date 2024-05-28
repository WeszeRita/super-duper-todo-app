import { FormControl } from '@angular/forms';

export interface IAddTodoForm {
  title: FormControl<string>;
  description: FormControl<string>;
}
