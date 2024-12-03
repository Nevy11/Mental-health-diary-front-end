import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatHint } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EmojiDialogueComponent } from './emoji-dialogue/emoji-dialogue.component';
import { MatIcon } from '@angular/material/icon';
import { DiaryService } from './diary.service';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DayRadioService } from '../goal/day-radio/day-radio.service';
import { Router } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MicDialogueComponent } from './mic-dialogue/mic-dialogue.component';
import { tap } from 'rxjs';

@Component({
    selector: 'diary-diary',
    imports: [
        MatHint,
        MatLabel,
        MatFormField,
        MatMenuModule,
        MatInputModule,
        PickerModule,
        FormsModule,
        MatFormFieldModule,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIcon,
        DialogModule,
    ],
    templateUrl: './diary.component.html',
    styleUrl: './diary.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiaryComponent implements OnInit {
  diaryEntry: string = '';
  showEmojiPicker = false;
  date!: string;
  currentDay!: String;
  constructor(
    private diaryService: DiaryService,
    private loginService: LoginService,
    private matSnackBar: MatSnackBar,
    private dayRadioService: DayRadioService,
    private router: Router
  ) {}
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  // dialogue
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(EmojiDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.diaryService.get_date().subscribe((resp) => {
      this.date = resp.date;
    });
    this.dayRadioService.GetCurrentDayFromBackend().subscribe((resp) => {
      this.currentDay = resp.day;
    });
    this.diaryService
      .read_diary({
        username: this.loginService.get_name_of_user,
      })
      .subscribe((resp) => {
        console.log(resp);
        this.diaryEntry =
          this.currentDay + ' ' + this.date + '\n\n' + resp.content + '  ';
      });
  }

  saveDiaryEntry() {
    let my_content!: string;
    let date!: string;
    let current_day!: string;
    if (this.loginService.get_name_of_user.length > 0) {
      this.dayRadioService.GetCurrentDayFromBackend().subscribe((resp) => {
        console.log(resp.day);
        current_day = resp.day;
      });
      this.diaryService.get_date().subscribe((resp) => {
        console.log(resp);
        date = resp.date;
      });
      this.diaryService
        .read_diary({ username: this.loginService.get_name_of_user })
        .subscribe((resp) => {
          console.log(resp);
          my_content = resp.content;
          this.diaryService
            .check_if_user_exists({
              username: this.loginService.get_name_of_user,
            })
            .subscribe((resp) => {
              console.log(resp);
              if (resp.exists) {
                console.log('Content: ', this.diaryEntry);
                console.log('Username: ', this.loginService.get_name_of_user);
                this.diaryService
                  .delete_diary({
                    username: this.loginService.get_name_of_user,
                  })
                  .pipe(
                    tap((resp) => {
                      console.log(resp);
                    })
                  )
                  .subscribe();
                this.diaryService
                  .update_diary({
                    username: this.loginService.get_name_of_user,
                    field: 'content',
                    new_value:
                      my_content +
                      // '\n' +
                      // current_day +
                      // '  ' +
                      // date +
                      // '\n' +
                      this.diaryEntry,
                  })

                  .subscribe((resp) => {
                    console.log(resp);

                    if (resp.message == 'NotFound') {
                      this.diaryService
                        .create_diary({
                          username: this.loginService.get_name_of_user,
                          content:
                            // '\n' +
                            // current_day +
                            // '  ' +
                            // date +
                            // '\n' +
                            this.diaryEntry,
                        })
                        .subscribe((resp) => {
                          console.log(resp);
                          this.matSnackBar.open(`Saved successfully`, 'Close', {
                            duration: 3000,
                          });
                        });
                    } else {
                      console.error(resp.message);
                    }
                  });
              }

              if (resp.message == 'NotFound') {
                let stored_data =
                  '\n' +
                  //  current_day + '  ' + date + '\n' +
                  this.diaryEntry;
                console.log(stored_data);
                this.diaryService
                  .create_diary({
                    username: this.loginService.get_name_of_user,
                    content: stored_data,
                  })
                  .subscribe((resp) => {
                    console.log(resp);
                    this.matSnackBar.open(`${resp.message}`, 'Close', {
                      duration: 3000,
                    });
                  });
              } else if (resp.exists) {
              } else {
                console.error(resp.message);
              }
            });
          console.log('Diary entry saved:', this.diaryEntry);
        });
    } else {
      console.error('Enter a valid username.');
      this.matSnackBar.open(`Nothing to save`, 'Close', {
        duration: 3000,
      });
    }
  }

  clear_Diary() {
    this.diaryService
      .delete_diary({ username: this.loginService.get_name_of_user })
      .subscribe((resp) => {
        console.log(resp);
        if (resp.success) {
          this.router.navigate(['dashboard']);
          this.matSnackBar.open(`Data is cleared successfully`, 'Close', {
            duration: 3000,
          });
        } else {
          console.log(resp.message);
        }
      });
  }
  back_to_dashboard() {
    this.router.navigate(['dashboard']);
  }
  dialogMic = inject(Dialog);

  openDialogMic(): void {
    // console.log('Started recording...');
    // this.dialogMic.open<string>(MicDialogueComponent);
    this.router.navigate(['Mic Diary']);
  }
}
