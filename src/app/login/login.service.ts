import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsSuccessful } from '../sign-up/sign-up';
import { Login } from './login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  to_login(data: Login) {
    let url = 'http://localhost:8080/login_user';
    return this.http.post<IsSuccessful>(url, data);
  }
}
