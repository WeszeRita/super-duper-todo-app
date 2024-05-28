import { FormControl } from '@angular/forms';

export
interface IEditTodoForm {
  title: FormControl<string>;
  description: FormControl<string>;
  isPinned: FormControl<boolean>;
}
