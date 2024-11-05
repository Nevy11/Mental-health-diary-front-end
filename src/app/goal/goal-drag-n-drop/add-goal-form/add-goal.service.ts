import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddForm,
  CheckIfGoalExists,
  clearGoal,
  GoalsDone,
  GoalsReturned,
  ReturnData,
  UpdateGoal,
} from './add-form';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddGoalService {
  constructor(private http: HttpClient) {}
  private todo_goals = new BehaviorSubject<string[]>([]);
  public todo_goal$ = this.todo_goals.asObservable();
  // private goalSubject = new BehaviorSubject<string[]>([]);
  // goals$ = this.goalSubject.asObservable();
  private todo: string[] = [];
  private done: string[] = [];
  set add_todo(data: string) {
    this.todo.push(data);
  }
  get get_todo() {
    return this.todo;
  }
  set set_done(data: string) {
    this.done.push(data);
  }
  get get_done() {
    return this.done;
  }
  /**
   *This function adds a new todo goal to the backend.
   * @param new_goal takes in a new goal of type AddForm
   */
  add_todo_Goal(new_goal: AddForm) {
    let url = 'http://localhost:8080/goal_create';
    return this.http.post(url, new_goal);
  }
  /**
   * clears the todo database.
   * @param clear_goal
   * @returns An observable of the cleared goals.
   */
  clear_todo_Goals(clear_goal: clearGoal) {
    let url = 'http://localhost:8080/clear_goals';
    return this.http.post(url, clear_goal);
  }

  Remove_todo_goals(data: GoalsDone) {
    let url = 'http://localhost:8080/delete_one_goal';
    return this.http.post(url, data);
  }
  /**
   *
   * @param data of type clearGoal interface.
   * @returns An array of all teh todo goals stored by the user.
   */
  get_todo_from_backend(data: clearGoal) {
    let url = 'http://localhost:8080/goal_read_one';
    return this.http.post<GoalsReturned[]>(url, data);
  }

  update_todo_from_backend(data: UpdateGoal) {
    let url = 'http://localhost:8080/goal_update';
    return this.http.patch(url, data);
  }
  delete_one_todo_from_backend(data: GoalsDone) {
    let url = 'http://localhost:8080/delete_one_goal';
    return this.http.post(url, data);
  }
  /**
   * Done goals.
   * The function creates Goals done.
   */
  create_done_goal(data: GoalsDone) {
    let url = 'http://localhost:8080/done_goal_create';
    return this.http.post(url, data);
  }
  read_one_done_goal(data: clearGoal) {
    let url = 'http://localhost:8080/done_goal_read_one';
    return this.http.post<GoalsReturned[]>(url, data);
  }
  update_done_goal(data: UpdateGoal) {
    let url = 'http://localhost:8080/done_goal_update';
    return this.http.patch(url, data);
  }
  delete_one_done_goal(data: GoalsDone) {
    let url = 'http://localhost:8080/done_goal_delete_all';
    return this.http.post(url, data);
  }
  delete_all_done_goals(data: clearGoal) {
    let url = 'http://localhost:8080/done_goal_delete_all';
    return this.http.post(url, data);
  }

  /**
   * Add a new todo_goal function
   */
  addGoal(newGoal: string) {
    const currentGoals = this.todo_goals.getValue();
    this.todo_goals.next([...currentGoals, newGoal]);
  }
  clearGoals() {
    this.todo_goals.next([]);
  }

  check_todo_exists(data: GoalsDone) {
    let url = 'http://localhost:8080/check_todo_exists';
    return this.http.post<CheckIfGoalExists>(url, data);
  }
  check_done_exists(data: GoalsDone) {
    let url = 'http://localhost:8080/check_done_exists';
    return this.http.post<CheckIfGoalExists>(url, data);
  }
}
