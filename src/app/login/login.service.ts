import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsSuccessful } from '../sign-up/sign-up';
import { Login } from './login';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private is_logged_in: boolean = false;
  set log_in_user(data: boolean) {
    this.is_logged_in = data;
  }
  get isloggedIn(): boolean {
    return this.is_logged_in;
  }
  constructor(private http: HttpClient) {}
  to_login(data: Login) {
    let url = 'http://localhost:8080/login_user';
    return this.http.post<IsSuccessful>(url, data);
  }
  // to_login(data: Login): Observable<IsSuccessful> {
  //   const url = 'http://localhost:8080/login_user';
  //   return this.http.post<IsSuccessful>(url, data).pipe(
  //     tap((response: IsSuccessful) => {
  //       console.log('Login response:', response); // Debugging: Check server response
  //       this.log_in_user = response.is_it; // Update login state
  //     })
  //   );
  // }
}
