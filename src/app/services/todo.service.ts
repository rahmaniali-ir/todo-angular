import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api';
import { Todo, TodoStatus } from '../types/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos() {
    this.http
      .get<ApiResponse<Todo[]>>(environment.apiUrl + 'todos')
      .subscribe((res) => (this.todos = res.body));
  }

  addTodo(todo: Partial<Todo>) {
    this.http
      .post<ApiResponse<Todo>>(environment.apiUrl + 'todo', todo)
      .subscribe((res) => this.todos.push(res.body));
  }

  deleteTodo(todo: Todo) {
    this.http
      .delete(environment.apiUrl + 'todo?uid=' + todo.id)
      .subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
  }

  toggleTodo(todo: Todo) {
    this.http
      .put<ApiResponse<Todo>>(environment.apiUrl + 'todo?uid=' + todo.id, {})
      .subscribe((res) => {
        const tt = this.todos.map((t) => {
          if (t.id === todo.id) {
            t.status = res.body.status;
          }

          return t;
        });
      });
  }
}
