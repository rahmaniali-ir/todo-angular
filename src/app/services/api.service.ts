import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T = any>(endpoint: string) {
    return this.http.get<ApiResponse<T>>(environment.apiUrl + endpoint);
  }

  post<T = any>(endpoint: string, payload: any) {
    return this.http.post<ApiResponse<T>>(
      environment.apiUrl + endpoint,
      payload
    );
  }

  put<T = any>(endpoint: string, payload: any) {
    return this.http.put<ApiResponse<T>>(
      environment.apiUrl + endpoint,
      payload
    );
  }

  delete<T = any>(endpoint: string) {
    return this.http.delete<ApiResponse<T>>(environment.apiUrl + endpoint);
  }
}
