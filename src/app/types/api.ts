export interface ApiResponse<T = any> {
  success: boolean;
  body: T;
}
