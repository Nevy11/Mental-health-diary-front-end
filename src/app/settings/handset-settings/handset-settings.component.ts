import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'diary-handset-settings',
  imports: [
    MatButtonToggleModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './handset-settings.component.html',
  styleUrl: './handset-settings.component.scss',
})
export class HandsetSettingsComponent {
  width = 300;
  height = 300;
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
