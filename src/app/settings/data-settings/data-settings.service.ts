import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnUserData, UserData } from './data-settings';

@Injectable({
  providedIn: 'root',
})
export class DataSettingsService {
  private login_page = true;
  private sign_up_page = true;

  public get get_login_page(): boolean {
    return this.login_page;
  }

  public set set_login_page(v: boolean) {
    this.login_page = v;
  }

  public get get_sign_up_page(): boolean {
    return this.sign_up_page;
  }

  public set set_sign_up_page(v: boolean) {
    this.set_sign_up_page = v;
  }

  constructor(private http: HttpClient) {}
  get_userdata(data: UserData) {
    let url = 'http://localhost:8080/user_read_one';
    return this.http.post<ReturnUserData>(url, data);
  }
}
