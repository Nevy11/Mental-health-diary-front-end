import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'diary-large-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './large-settings.component.html',
  styleUrl: './large-settings.component.scss',
})
export class LargeSettingsComponent {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
