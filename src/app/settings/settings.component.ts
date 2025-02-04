import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingformComponent } from './settingform/settingform.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DataSettingsComponent } from './data-settings/data-settings.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { UsernameSetComponent } from './username-set/username-set.component';
import { EmailSetComponent } from './email-set/email-set.component';
import { PasswordSetComponent } from './password-set/password-set.component';
@Component({
  selector: 'diary-settings',
  imports: [
    SettingformComponent,
    MatButtonModule,
    DataSettingsComponent,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    UsernameSetComponent,
    EmailSetComponent,
    PasswordSetComponent,
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
  show_form: boolean = false;
  update_settings() {
    this.show_form = !this.show_form;
  }
  fontStyleControl = new FormControl('');
  fontStyle?: string;

  width = 300;
  height = 300;
}
