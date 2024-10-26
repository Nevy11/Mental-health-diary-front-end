import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddForm, clearGoal } from './add-form';

@Injectable({
  providedIn: 'root',
})
export class AddGoalService {
  constructor(private http: HttpClient) {}
  addGoal(new_goal: AddForm) {
    let url = 'http://localhost:8080';
    return this.http.post(url, new_goal);
  }
  clearGoals(clear_goal: clearGoal) {
    let url = 'http://localhost:8080';
    return this.http.post(url, clear_goal);
  }
}
