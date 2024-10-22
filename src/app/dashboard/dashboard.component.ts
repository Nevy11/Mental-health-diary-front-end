import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    MatSlideToggleModule,
    MatSidenavModule,
    RouterModule,
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
            button_name: 'to_mental_ai',
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
            additional_track_goal: 'Update your goals',
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
          button_name: 'to_mental_ai',
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
            'Enter you goals, try improving yourself, both mentally and physically. Set your goals, for example, If you have social anxiety, talk to 5 people this week, and in the goal area, if you achieve, carry your goal from todo section to done; then save your update. This enables and helps you to improve your self every day. Do not forget to become the best version of yourself!',
          additional_track_goal:
            "This is how it works, choose a particular day of your week to keep on updating your goals. Once it is done, Yo'll be given  two containers, one is labeled `todo` while the other is labeled `done`. Add your goals, then enter to place it in the to do list. When you finish, drag your achieved from the `todo` to `done`",
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
  constructor(private router: Router) {}
  sign_out() {
    this.router.navigate(['login']);
  }
  to_mental_ai() {
    this.router.navigate(['Mental AI']);
  }
  to_track_goal() {
    this.router.navigate(['Track Goal']);
  }
  to_settings() {
    this.router.navigate(['Settings']);
  }
  to_diary() {
    this.router.navigate(['Diary']);
  }
  route_function(name: string) {
    if (name == 'Mental AI') {
      this.to_mental_ai();
    }
    if (name == 'Track Goal') {
      this.to_track_goal();
    }
    if (name == 'Diary') {
      this.to_diary();
    }
    if (name == 'Settings') {
      this.to_settings();
    }
  }
}
