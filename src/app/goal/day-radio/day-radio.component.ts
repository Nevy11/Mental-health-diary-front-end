import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'diary-day-radio',
  standalone: true,
  imports: [MatRadioModule, FormsModule],
  templateUrl: './day-radio.component.html',
  styleUrl: './day-radio.component.scss',
})
export class DayRadioComponent {
  favoriteSeason!: string;
  seasons: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednessday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
}
