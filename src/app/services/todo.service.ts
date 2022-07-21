import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api';
import { Todo } from '../types/todo';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor(private api: ApiService) {}

  fetchTodos() {
    this.api.get<Todo[]>('todos').subscribe((res) => (this.todos = res.body));
  }

  addTodo(todo: Partial<Todo>) {
    this.api
      .post<Todo>('todo', todo)
      .subscribe((res) => this.todos.push(res.body));
  }

  deleteTodo(todo: Todo) {
    this.api.delete('todo?uid=' + todo.id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }

  toggleTodo(todo: Todo) {
    this.api.put<Todo>('todo?uid=' + todo.id, {}).subscribe((res) => {
      const tt = this.todos.map((t) => {
        if (t.id === todo.id) {
          t.status = res.body.status;
        }

        return t;
      });
    });
  }
}
