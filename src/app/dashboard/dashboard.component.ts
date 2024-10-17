import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'diary-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Mental AI',
            cols: 1,
            rows: 1,
            mobile: true,
            card_content: 'Speak or write to mental gpt.',
          },
          {
            title: 'Diary',
            cols: 1,
            rows: 1,
            mobile: true,
            diary: 'Note all your feelings, emotions, and behaviour',
          },
          {
            title: 'Goals',
            cols: 1,
            rows: 1,
            mobile: true,
            track_goal:
              'Enter you goals, try improving yourself, both mentally and physically. ',
          },
          {
            title: 'Settings',
            cols: 1,
            rows: 1,
            mobile: true,
            settings: 'Update your username, email and password',
          },
        ];
      }

      return [
        {
          title: 'Mental AI',
          cols: 2,
          rows: 1,
          mobile: false,
          card_content:
            "Talk to me about all of what you are feeling right now and i'll help you. \n Save the cost that you are planning to hire a therapist. \n\n ",
        },
        {
          title: 'Diary',
          cols: 1,
          rows: 1,
          mobile: false,
          diary:
            "Write all of what you are feeling right now to rembember your past. \n Wait, You don't need to type to write all of what you are feeling, we'll do that for you. Just speak as if you are speaking to a real therapist.",
        },
        {
          title: 'Track Goal',
          cols: 1,
          rows: 2,
          mobile: false,
          track_goal:
            'Enter you goals, try improving yourself, both mentally and physically. Set your goals, for example, If you have social anxiety, talk to 5 people this week, and in the goal area, if you achieve, carry your goal from todo section to done; then save your update. This enables and helps you to improve your self every day. Success in tracking your goal mate',
        },
        {
          title: 'Settings',
          cols: 1,
          rows: 1,
          mobile: false,
          settings:
            'view your user settings, update your username, email and password.',
        },
      ];
    })
  );
}
