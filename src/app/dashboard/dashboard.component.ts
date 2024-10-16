import { Component } from '@angular/core';
import { DashDividersComponent } from './dash-dividers/dash-dividers.component';

@Component({
  selector: 'diary-dashboard',
  standalone: true,
  imports: [DashDividersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
