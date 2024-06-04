import { FormControl } from '@angular/forms';
import { Status } from '../enums';

export interface IEditTodoForm {
  status: FormControl<Status>;
  title: FormControl<string>;
  description: FormControl<string>;
}
