import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/types/action';
import { Todo, TodoStatus } from 'src/app/types/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Input() actions: Action[] = [];

  @Output() onAction = new EventEmitter<Action>();

  constructor() {}

  ngOnInit(): void {}

  get checked() {
    return this.todo.status === TodoStatus.Done;
  }

  get showActions() {
    return this.actions.length > 0;
  }

  clicked(event: MouseEvent) {
    this.onAction.emit({
      name: 'click',
      event,
    });
  }

  actionClicked(action: Action) {
    this.onAction.emit(action);
  }
}
