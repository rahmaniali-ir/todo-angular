import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo, TodoStatus } from 'src/app/types/todo';

@Component({
  selector: 'todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.sass'],
})
export class TodoListPageComponent implements OnInit {
  title = '';
  body = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }

  get todos() {
    return this.todoService.todos;
  }

  addTodo() {
    this.todoService.addTodo({
      title: this.title,
      body: this.body,
      status: TodoStatus.Undone,
    });

    this.title = this.body = '';
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }
}
