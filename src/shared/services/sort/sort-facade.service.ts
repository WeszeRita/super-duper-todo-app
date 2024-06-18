import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortingActions } from '../../store/sorting';
import { IOption } from '../../interfaces';

@Injectable()
export class SortFacadeService {
  constructor(private store: Store) {}

  sort(sortTermId: IOption['id']): void {
    this.store.dispatch(SortingActions.sort({ sortTermId }));
  }
}
