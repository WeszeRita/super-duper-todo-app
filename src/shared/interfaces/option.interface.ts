import { SortTerm, Status } from '../enums';

export interface IOption {
  id: Status | SortTerm;
  value: string;
}
