import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/types/action';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];
  @Input() actions: Action[] = [];

  @Output() onAction = new EventEmitter<Action<Todo>>();

  constructor() {}

  ngOnInit(): void {}

  get isEmpty() {
    return this.todos.length === 0;
  }

  trackById(index: number) {
    return this.todos?.[index] ? this.todos[index].id : 0;
  }

  actionClicked(todo: Todo, action: Action) {
    action.data = todo;
    this.onAction.emit(action);
  }
}
