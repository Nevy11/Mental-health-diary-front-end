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
  private username: string = '';
  set set_name_of_user(name: string) {
    this.username = name;
  }
  get get_name_of_user() {
    return this.username;
  }
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
}
