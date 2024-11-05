import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DayRadioService } from './day-radio.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'diary-day-radio',
  standalone: true,
  imports: [MatRadioModule, FormsModule, MatButtonModule],
  templateUrl: './day-radio.component.html',
  styleUrl: './day-radio.component.scss',
})
export class DayRadioComponent implements OnInit {
  favourite_day!: string;
  seasons: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  my_day!: string;
  constructor(
    private dayRadioService: DayRadioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  select_day() {
    console.log(this.favourite_day);
    this.dayRadioService.updateFavouriteDay(this.favourite_day);
    this.dayRadioService.favouriteDay$.subscribe((resp) => {
      this.my_day = resp;
    });
    this.dayRadioService
      .create_favourite_day(this.favourite_day)
      .subscribe((resp) => {
        console.log(resp);
      });
    this.router.navigate(['dashboard']);
    this.snackBar.open(
      `Your plan day is set to ${this.favourite_day}`,
      'Close',
      {
        duration: 3000,
      }
    );
  }
  ngOnInit(): void {
    this.dayRadioService.get_favourite_day().subscribe((resp) => {
      if (resp.success) {
        this.favourite_day = resp.day_favourite;
      } else {
        console.error(resp.message);
      }
    });
  }
}
