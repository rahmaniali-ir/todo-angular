export interface Action<T = any> {
  name: string;
  title?: string;
  icon?: string;
  color?: string;
  data?: T;
  event?: Event;
}
