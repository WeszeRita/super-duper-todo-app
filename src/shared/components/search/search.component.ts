import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchFacadeService } from '../../services/search/search-facade.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input()
  placeholder: string;

  searchTermInput = new FormControl(null);

  constructor(private destroyRef: DestroyRef, private searchFacadeService: SearchFacadeService) {}

  ngOnInit(): void {
    this.searchTermInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: string) => this.searchFacadeService.search(value));
  }
}
