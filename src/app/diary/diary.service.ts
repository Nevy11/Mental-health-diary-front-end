import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Date_diary,
  Diary,
  DiaryExists,
  DiaryOneData,
  DiaryReturn,
  DiaryUpdate,
} from './diary';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  constructor(private http: HttpClient) {}
  create_diary(data: Diary) {
    let url = 'http://127.0.0.1:8080/diary_create';
    return this.http.post<DiaryReturn>(url, data);
  }
  read_diary(data: DiaryOneData) {
    let url = 'http://127.0.0.1:8080/diary_read_one';
    return this.http.post<DiaryReturn>(url, data);
  }
  update_diary(data: DiaryUpdate) {
    let url = 'http://127.0.0.1:8080/diary_update';
    return this.http.patch<DiaryReturn>(url, data);
  }
  delete_diary(data: DiaryOneData) {
    let url = 'http://127.0.0.1:8080/diary_delete';
    return this.http.post<DiaryReturn>(url, data);
  }
  check_if_user_exists(data: DiaryOneData) {
    let url = 'http://127.0.0.1:8080/check_if_user_exists';
    return this.http.post<DiaryExists>(url, data);
  }
  get_date() {
    let url = 'http://127.0.0.1:8080/date_actual';
    return this.http.get<Date_diary>(url);
  }
}
