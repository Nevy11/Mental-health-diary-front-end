import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentDay, FavouriteDay, FavouriteDayReturn } from './current-day';
import { LoginService } from '../../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class DayRadioService {
  constructor(private http: HttpClient, private loginService: LoginService) {}
  private favouriteDay = new BehaviorSubject<string>('');
  favouriteDay$ = this.favouriteDay.asObservable();
  updateFavouriteDay(newDay: string) {
    this.favouriteDay.next(newDay);
  }
  // private currentDay = new BehaviorSubject<string>('');
  // currentDay$ = this.currentDay.asObservable()
  GetCurrentDayFromBackend() {
    let url = 'http://localhost:8080/day_current';
    return this.http.get<CurrentDay>(url);
  }
  create_favourite_day(favourite_day: string) {
    const username = this.loginService.get_name_of_user;
    let url = 'http://localhost:8080/fav_day_create';

    return this.http.post(url, {
      username: username,
      day_favourite: favourite_day,
    });
  }
  get_favourite_day() {
    const username = this.loginService.get_name_of_user;
    let url = 'http://localhost:8080/fav_day_read_one';
    return this.http.post<FavouriteDayReturn>(url, { username: username });
  }
}
