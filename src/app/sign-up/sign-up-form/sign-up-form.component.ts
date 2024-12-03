import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SignUpFormService } from './sign-up-form.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignUp } from '../sign-up';

// Custom Validator to check if passwords match
function passwordsMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password1 = formGroup.get('userpassword1')?.value;
    const password2 = formGroup.get('userpassword2')?.value;

    // Return error if passwords do not match
    if (password1 && password2 && password1 !== password2) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
    selector: 'diary-sign-up-form',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  emailForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignUpFormService,
    private router: Router
  ) {
    this.emailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        userpassword1: ['', [Validators.required, Validators.minLength(6)]],
        userpassword2: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: passwordsMatchValidator(), // Add validator here
      }
    );
  }

  get email() {
    return this.emailForm.get('email');
  }

  get username() {
    return this.emailForm.get('username');
  }

  get userpassword1() {
    return this.emailForm.get('userpassword1');
  }

  get userpassword2() {
    return this.emailForm.get('userpassword2');
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const { email, username, userpassword1 } = this.emailForm.value;

      console.log('The email is submitted successfully', email);
      console.log(`User: ${username} will be redirected to the login page`);

      const body: SignUp = {
        username,
        userpassword: userpassword1,
        email,
      };

      this.signupService.sign_up(body).subscribe((resp) => {
        console.log(resp);
        if (resp.is_it === true) {
          console.log(`User ${username} is added successfully to the system`);
          this.emailForm.reset();
          this.router.navigate(['login']);
        } else {
          console.error('Request unsucceful');
        }
      });
    } else {
      console.error('Please fill in the fields marked red');
    }
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
