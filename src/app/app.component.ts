import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { DataSettingsService } from './settings/data-settings/data-settings.service';
@Component({
    selector: 'diary-root',
    imports: [
        RouterOutlet,
        MatButtonModule,
        MatSidenavModule,
        MatSlideToggleModule,
        CommonModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  name = 'MHD';

  constructor(
    private router: Router,
    private settingService: DataSettingsService,
    private cdr: ChangeDetectorRef
  ) {}
  logout() {
    this.router.navigate(['login']);
  }
  toggletheme() {
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
  login_page!: boolean;
  ngAfterViewInit(): void {
    console.log('Ngonchanges is called');
    this.login_page = this.settingService.get_login_page;
    this.cdr.detectChanges();
  }
}
