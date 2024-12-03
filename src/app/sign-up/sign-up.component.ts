import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { Router, RouterModule } from '@angular/router';
import { DataSettingsService } from '../settings/data-settings/data-settings.service';

@Component({
    selector: 'diary-sign-up',
    imports: [MatButtonModule, SignUpFormComponent, RouterModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private settingService: DataSettingsService
  ) {}
  login() {
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.settingService.set_login_page = true;
  }
  ngOnDestroy(): void {
    this.settingService.set_login_page = false;
  }
}
