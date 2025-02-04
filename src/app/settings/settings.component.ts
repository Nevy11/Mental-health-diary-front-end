import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MediumSettingsComponent } from './medium-settings/medium-settings.component';
import { HandsetSettingsComponent } from './handset-settings/handset-settings.component';
import { LargeSettingsComponent } from './large-settings/large-settings.component';
import { LargeBraveSettingsComponent } from './large-brave-settings/large-brave-settings.component';

@Component({
  selector: 'diary-settings',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MediumSettingsComponent,
    HandsetSettingsComponent,
    LargeSettingsComponent,
    LargeBraveSettingsComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['login']);
  }
  vcr = inject(ViewContainerRef);
  breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => {
      if (result.matches) {
        return true;
      }
      return false;
    })
  );
  isMedium$ = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
    map((x) => {
      if (x.matches) {
        return true;
      }

      return false;
    })
  );

  isLarge$ = this.breakpointObserver.observe(Breakpoints.XLarge).pipe(
    map((x) => {
      if (x.matches) {
        return true;
      }
      return false;
    })
  );
  isLargeBrave$ = this.breakpointObserver.observe(Breakpoints.Large).pipe(
    map((x) => {
      if (x.matches) {
        return true;
      } else {
        return false;
      }
    })
  );
}
