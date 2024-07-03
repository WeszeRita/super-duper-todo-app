import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { SortFacadeService } from '../../services/sort/sort-facade.service';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { SortOption } from '../../enums';
import { IOption } from '../../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  options: IOption[] = [
    {
      id: SortOption.date,
      value: this.translateService.instant(this.buildTranslationKey(SortOption.date)),
    },
    {
      id: SortOption.status,
      value: this.translateService.instant(this.buildTranslationKey(SortOption.status)),
    },
    {
      id: SortOption.name,
      value: this.translateService.instant(this.buildTranslationKey(SortOption.name)),
    },
  ];

  sortControl: FormControl<IOption>;

  constructor(
    private dialog: Dialog,
    private sortFacadeService: SortFacadeService,
    private destroyRef: DestroyRef,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.sortControl = new FormControl<IOption>(this.options[0]);

    this.sortControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: IOption) => {
        this.sortFacadeService.sort(value.id);
      });
  }

  openDialog(): void {
    this.dialog.open(TodoFormComponent);
  }

  buildTranslationKey(relativeKey: string): string {
    return `header.${ relativeKey }`;
  }
}
