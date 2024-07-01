import { createAction, props } from '@ngrx/store';
import { IOption } from '@shared';

const enum SortAction {
  sort = '[Sort] Sort',
}

export namespace SortingActions {
  export const sort = createAction(SortAction.sort, props<{ sortTermId: IOption['id'] }>());
}
