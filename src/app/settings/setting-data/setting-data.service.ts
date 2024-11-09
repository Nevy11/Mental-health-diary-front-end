import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiaryOneData } from '../../diary/diary';
import { AppTimetableItem, ReturnUserData } from './setting-data';

@Injectable({
  providedIn: 'root',
})
export class SettingDataService {
  constructor(private http: HttpClient) {}
  get_userdata(data: DiaryOneData) {
    let url = 'http://127.0.0.1:8080/user_read_one';
    return this.http.post<ReturnUserData>(url, data);
  }
  EXAMPLE_DATA: AppTimetableItem[] = [
    { id: 'Username', name: 'angular' },
    { id: 'Email', name: 'angular@gmail.com' },
    { id: 'Password', name: '******' },
  ];
}
