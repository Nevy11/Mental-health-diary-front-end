import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsernameSet, UsernameUpdateReturn } from './username-set';

@Injectable({
  providedIn: 'root',
})
export class UsernameUpdateService {
  constructor(private http: HttpClient) {}
  update_username(data: UsernameSet) {
    return this.http.patch<UsernameUpdateReturn>(
      'http://127.0.0.1:8080/update_email_or_username',
      data
    );
  }
}
