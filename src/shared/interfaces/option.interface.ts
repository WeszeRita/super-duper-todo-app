import { SortOption, Status } from '../enums';

export interface IOption {
  id: Status | SortOption;
  value: string;
}
