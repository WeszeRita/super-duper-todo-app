import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '@shared';
import { Observable } from 'rxjs';

@Injectable()
export class TodoService {
  private readonly url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.url);
  }

  getTodo(id: ITodo['id']): Observable<ITodo> {
    return this.http.get<ITodo>(`${this.url}/${id}`);
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(this.url, { ...todo });
  }

  editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(`${ this.url }/${ todo.id }`, { ...todo });
  }

  removeTodo(id: ITodo['id']): Observable<ITodo> {
    return this.http.delete<ITodo>(`${ this.url }/${ id }`);
  }
}
