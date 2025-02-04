import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'diary-large-brave-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './large-brave-settings.component.html',
  styleUrl: './large-brave-settings.component.scss',
})
export class LargeBraveSettingsComponent {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
