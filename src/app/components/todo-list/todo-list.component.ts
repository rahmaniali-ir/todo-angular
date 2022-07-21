import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] = [];

  @Output() onClick = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  trackById(index: number) {
    return this.todos?.[index] ? this.todos[index].id : 0;
  }

  todoClicked(todo: Todo) {
    this.onClick.emit(todo);
  }
}
