import { Status } from '../enums';

export interface ITodo {
  id?: string;
  title: string;
  description: string;
  status: Status;
  tags?: string[];
  isPinned: boolean;
  createdAt: number;
  updatedAt: number | null;
}
