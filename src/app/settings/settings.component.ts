import { Component } from '@angular/core';
import { SettingformComponent } from './settingform/settingform.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DataSettingsComponent } from './data-settings/data-settings.component';

@Component({
  selector: 'diary-settings',
  standalone: true,
  imports: [SettingformComponent, MatButtonModule, DataSettingsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
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
}
