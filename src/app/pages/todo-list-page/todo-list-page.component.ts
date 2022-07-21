import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { Action } from 'src/app/types/action';
import { Todo, TodoStatus } from 'src/app/types/todo';

@Component({
  selector: 'todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.sass'],
})
export class TodoListPageComponent implements OnInit {
  form = new FormGroup({
    searchKey: new FormControl('', []),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });
  actions: Action[] = [
    {
      name: 'delete',
      title: 'Delete',
    },
  ];

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }

  get searchKeyFormControl() {
    return this.form.controls.searchKey;
  }

  get titleFormControl() {
    return this.form.controls.title;
  }

  get bodyFormControl() {
    return this.form.controls.body;
  }

  get todos() {
    return this.todoService.todos;
  }

  get filteredTodos() {
    const searchKey =
      this.searchKeyFormControl.value?.trim().toLowerCase() || '';
    return this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchKey)
    );
  }

  addTodo() {
    this.todoService.addTodo({
      title: this.titleFormControl.value || '',
      body: this.bodyFormControl.value || '',
      status: TodoStatus.Undone,
    });

    this.titleFormControl.setValue('');
    this.bodyFormControl.setValue('');
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

  signOut() {
    this.authService.signOut();
  }
}
