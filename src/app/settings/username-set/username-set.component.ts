import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { DataSettingsService } from '../data-settings/data-settings.service';
import { LoginService } from '../../login/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsernameUpdateService } from './username-update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'diary-username-set',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './username-set.component.html',
  styleUrl: './username-set.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameSetComponent implements OnInit {
  constructor(
    private dataSettingsService: DataSettingsService,
    private LoginService: LoginService,
    private usernameUpdateService: UsernameUpdateService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    merge(this.new_username.statusChanges, this.new_username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  username!: string;
  ngOnInit(): void {
    this.dataSettingsService
      .get_userdata({
        username: this.LoginService.get_name_of_user,
      })
      .subscribe((resp) => {
        console.log(resp.username);
        if (resp.username) {
          this.username = resp.username;
        }
      });
  }

  readonly new_username = new FormControl('', [Validators.required]);
  error_message = signal('');
  updateErrorMessage() {
    if (this.new_username.hasError('required')) {
      this.error_message.set('Please enter a valid username');
    }
  }
  update_username() {
    if (this.new_username.value) {
      this.usernameUpdateService
        .update_username({
          username: this.LoginService.get_name_of_user,
          field: 'username',
          new_value: this.new_username.value,
        })
        .subscribe((resp) => {
          console.log(resp);
          if (resp.is_it) {
            this.router.navigate(['dashboard']);
            this.snackBar.open(
              `Username updated successfully to: ${this.new_username.value}`,
              'Close',
              { duration: 1000 }
            );
          } else {
            this.snackBar.open('Failed to update the username!', 'Close', {
              duration: 3000,
            });
          }
        });
    } else {
      this.router.navigate(['dashboard']);
      this.snackBar.open('Please enter a missing value', 'Close', {
        duration: 3000,
      });
    }
  }
}
