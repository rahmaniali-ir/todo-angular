import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../types/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private handleError(error: string) {
    console.error('API Error: ', error);
    this.snackBar.open(error);
  }

  private errorHandlerWrapper<T = any>(obs: Observable<ApiResponse<T>>) {
    return new Observable<T>((subscriber) => {
      obs.subscribe({
        next: (res) => {
          if (res.success) {
            subscriber.next(res.body);
            subscriber.complete();
          } else {
            if (res.message) {
              this.handleError(res.message);
            } else {
              this.handleError('Server Error!');
            }
          }
        },
        error: (error) => {
          const message = error.error?.message || error.message;
          this.handleError(message);
          subscriber.error(message);
          subscriber.complete();
        },
      });
    });
  }

  get<T = any>(endpoint: string) {
    return this.errorHandlerWrapper(
      this.http.get<ApiResponse<T>>(environment.apiUrl + endpoint)
    );
  }

  post<T = any>(endpoint: string, payload: any) {
    return this.errorHandlerWrapper(
      this.http.post<ApiResponse<T>>(environment.apiUrl + endpoint, payload)
    );
  }

  put<T = any>(endpoint: string, payload: any) {
    return this.errorHandlerWrapper(
      this.http.put<ApiResponse<T>>(environment.apiUrl + endpoint, payload)
    );
  }

  delete<T = any>(endpoint: string) {
    return this.errorHandlerWrapper(
      this.http.delete<ApiResponse<T>>(environment.apiUrl + endpoint)
    );
  }
}
