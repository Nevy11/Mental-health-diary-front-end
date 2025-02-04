import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UsernameSetComponent } from '../username-set/username-set.component';
import { PasswordSetComponent } from '../password-set/password-set.component';
import { EmailSetComponent } from '../email-set/email-set.component';

@Component({
  selector: 'diary-medium-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    UsernameSetComponent,
    PasswordSetComponent,
    EmailSetComponent,
  ],
  templateUrl: './medium-settings.component.html',
  styleUrl: './medium-settings.component.scss',
})
export class MediumSettingsComponent {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
