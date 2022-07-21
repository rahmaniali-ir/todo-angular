import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Action } from 'src/app/types/action';
import { Todo, TodoStatus } from 'src/app/types/todo';

@Component({
  selector: 'todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.sass'],
})
export class TodoListPageComponent implements OnInit {
  title = '';
  body = '';
  searchKey = '';
  actions: Action[] = [
    {
      name: 'delete',
      title: 'Delete',
    },
  ];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }

  get todos() {
    return this.todoService.todos;
  }

  get filteredTodos() {
    const searchKey = this.searchKey.trim().toLowerCase();
    return this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchKey)
    );
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

  onListAction(action: Action<Todo>) {
    const todo = action.data;

    if (!todo) return;

    switch (action.name) {
      case 'click':
        return this.toggleTodo(todo);

      case 'delete':
        return this.deleteTodo(todo);
    }
  }
}
