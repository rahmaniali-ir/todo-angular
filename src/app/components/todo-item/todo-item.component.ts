import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodoStatus } from 'src/app/types/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  constructor() {}

  ngOnInit(): void {}

  get checked() {
    return this.todo.status === TodoStatus.Done;
  }
}
