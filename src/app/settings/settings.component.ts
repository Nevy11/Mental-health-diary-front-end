import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingformComponent } from './settingform/settingform.component';
import { SettingDataComponent } from './setting-data/setting-data.component';

@Component({
  selector: 'diary-settings',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    SettingformComponent,
    SettingDataComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
