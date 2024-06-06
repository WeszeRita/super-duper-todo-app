import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TodoFacadeService } from '@shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true,
    },
  ],
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  value: string;
  searchTermInput = new FormControl(null);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(private destroyRef: DestroyRef, private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.searchTermInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.todoFacadeService.searchTodo(this.value));
  }

  setValue(input: Event): void {
    this.writeValue((input.target as HTMLInputElement).value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  buildTranslationKey(relativeKey: string): string {
    return `search.${ relativeKey }`;
  }
}
