export enum TodoStatus {
  'Undone',
  'InProgress',
  'Done',
}

export interface Todo {
  id: string;
  title: string;
  body: string;
  status: TodoStatus;
}
