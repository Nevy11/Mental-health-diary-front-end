import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'diary-sign-up',
  standalone: true,
  imports: [MatButtonModule, SignUpFormComponent, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private router: Router) {}
  login() {
    this.router.navigate(['dashboard']);
  }
}
