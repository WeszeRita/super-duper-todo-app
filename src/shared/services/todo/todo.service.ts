import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
  private readonly url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.url);
  }

  createTodo(todo: Pick<ITodo, 'title' | 'description'>): Observable<ITodo> {
    return this.http.post<ITodo>(this.url, { ...todo });
  }

  editTodo(todo: Partial<ITodo>): Observable<ITodo> {
    return this.http.patch<ITodo>(`${ this.url }/${ todo.id }`, { ...todo });
  }

  pinTodo(id: ITodo['id']): Observable<ITodo['id']> {
    return this.http.patch<ITodo['id']>(`${ this.url }/${ id }/pin`, { id });
  }

  unpinTodo(id: ITodo['id']): Observable<ITodo['id']> {
    return this.http.patch<ITodo['id']>(`${ this.url }/${ id }/unpin`, { id });
  }

  removeTodo(id: ITodo['id']): Observable<ITodo> {
    return this.http.delete<ITodo>(`${ this.url }/${ id }`);
  }
}
