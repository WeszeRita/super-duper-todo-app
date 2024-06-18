import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { SortFacadeService } from '../../services/sort/sort-facade.service';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { SortTerm } from '../../enums';
import { IOption } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  options: IOption[] = [
    {
      id: SortTerm.date,
      value: `${ this.buildTranslationKey(SortTerm.date) }`,
    },
    {
      id: SortTerm.status,
      value: `${ this.buildTranslationKey(SortTerm.status) }`,
    },
    {
      id: SortTerm.name,
      value: `${ this.buildTranslationKey(SortTerm.name) }`,
    },
  ];

  iconSrc = 'assets/icons/sort.svg';
  sortControl: FormControl<SortTerm>;

  constructor(public dialog: Dialog, private sortFacadeService: SortFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.sortControl = new FormControl<SortTerm>(SortTerm.date);

    this.sortControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: SortTerm) => {
        this.options.filter((option) => {
          if (option.id === value) {
            this.sortFacadeService.sort(option.id);
          }
        });
      });
  }

  openDialog(): void {
    this.dialog.open(TodoFormComponent);
  }

  buildTranslationKey(relativeKey: string): string {
    return `header.${ relativeKey }`;
  }
}
