import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IsSuccessful, MessageReturned, SignUp } from '../sign-up';

@Injectable({
  providedIn: 'root',
})
export class SignUpFormService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:8080/sign_up_user';
  sign_up(body: SignUp) {
    return this.http.post<IsSuccessful>(this.url, body);
  }
}
