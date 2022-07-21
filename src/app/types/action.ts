export interface Action<T = any> {
  name: string;
  title?: string;
  data?: T;
  event?: Event;
}
