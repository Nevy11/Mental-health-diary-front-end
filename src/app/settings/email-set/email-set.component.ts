import { Component, OnInit } from '@angular/core';
import { DataSettingsService } from '../data-settings/data-settings.service';
import { LoginService } from '../../login/login.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'diary-email-set',
  imports: [MatButtonModule],
  templateUrl: './email-set.component.html',
  styleUrl: './email-set.component.scss',
})
export class EmailSetComponent implements OnInit {
  constructor(
    private dataSettingsService: DataSettingsService,
    private LoginService: LoginService
  ) {}
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
}
