import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'diary-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatLabel,
    MatCardContent,
    MatCardHeader,
    MatError,
    MatFormField,
    MatCardTitle,
    MatCardHeader,
    MatCardFooter,
    MatCardActions,
    MatIcon,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      let data: Login = {
        username: username,
        userpassword: password,
      };
      this.loginService.to_login(data).subscribe((resp) => {
        console.log(resp);
        if (resp.is_it) {
          this.router.navigate(['dashboard']);
        } else {
          console.error('Incorrect username or password');
        }
      });
    } else {
      console.error('please fill in the missing fields');
    }
  }
  signUp() {
    this.router.navigate(['sign up']);
  }
}
