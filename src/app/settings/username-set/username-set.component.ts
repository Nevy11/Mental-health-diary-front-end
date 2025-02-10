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
    private LoginService: LoginService
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
}
