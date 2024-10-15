import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';

@Component({
  selector: 'diary-sign-up',
  standalone: true,
  imports: [MatButtonModule, SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
