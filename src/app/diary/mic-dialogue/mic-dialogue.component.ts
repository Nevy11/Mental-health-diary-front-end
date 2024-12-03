import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MicDialogueService } from './mic-dialogue.service';
import { DiaryService } from '../diary.service';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, tap, switchMap, finalize } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'diary-mic-dialogue',
    imports: [MatIconModule, MatProgressSpinnerModule],
    templateUrl: './mic-dialogue.component.html',
    styleUrls: ['./mic-dialogue.component.scss']
})
export class MicDialogueComponent implements OnInit, OnDestroy {
  show_spinner = false;
  mediaRecorder: MediaRecorder | undefined;
  audioChunks: Blob[] = [];
  diaryEntry: string = '';
  subscriptions: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private micDialogueService: MicDialogueService,
    private diaryService: DiaryService,
    private loginService: LoginService,
    private router: Router,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('Mic dialogue initialized');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) =>
        this.audioChunks.push(event.data);
      this.mediaRecorder.start();
    } catch (error) {
      this.snackBar.open(`Microphone access denied: ${error}`, 'Close', {
        duration: 3000,
      });
      console.error('Microphone access denied');
    }
  }

  convert_audio_text() {
    this.show_spinner = true;
    this.cdRef.detectChanges(); // Trigger change detection
    console.log('Spinner started');
    if (!this.mediaRecorder) {
      console.warn('Media Recorder is not available');
      this.show_spinner = false;
      this.cdRef.detectChanges(); // Trigger change detection
      return;
    }

    this.mediaRecorder.onstop = async () => {
      console.log('Media recorder stopped');
      const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.wav');

      this.subscriptions.add(
        this.micDialogueService
          .convert_audio_rust(formData)
          .pipe(
            tap((resp) => {
              if (resp.success) {
                this.diaryEntry = resp.message;
                console.log(`DiaryEntry_audio: ${this.diaryEntry}`);
                this.updateOrCreateDiary();
              } else {
                console.error('Error in audio conversion:', resp.message);
                this.show_spinner = false;
                this.cdRef.detectChanges(); // Trigger change detection
              }
            }),
            catchError((error) => {
              console.error('Error in audio conversion service:', error);
              this.snackBar.open('Audio conversion failed', 'Close', {
                duration: 3000,
              });
              this.show_spinner = false;
              this.cdRef.detectChanges(); // Trigger change detection
              return [];
            }),
            finalize(() => {
              console.log('Finalizing audio conversion');
              this.show_spinner = false;
              this.cdRef.detectChanges(); // Ensure spinner stops
            })
          )
          .subscribe()
      );

      this.audioChunks = [];
    };

    this.mediaRecorder.stop();
  }

  updateOrCreateDiary() {
    const username = this.loginService.get_name_of_user;
    if (!username) {
      console.error('Enter a valid username.');
      this.show_spinner = false;
      this.cdRef.detectChanges(); // Trigger change detection
      return;
    }

    console.log('Starting diary read/update');

    this.subscriptions.add(
      this.diaryService
        .read_diary({ username })
        .pipe(
          switchMap((resp) => {
            const existingContent = resp.content || '';
            const updatedContent = `${existingContent} ${this.diaryEntry}`;
            return this.diaryService.update_diary({
              username,
              field: 'CONTENT',
              new_value: updatedContent,
            });
          }),
          tap((resp) => {
            if (resp.success) {
              console.log('Diary updated successfully:', resp.content);
            } else if (resp.message === 'NotFound') {
              this.createDiary(username);
            } else {
              console.error('Diary update error:', resp.message);
              this.show_spinner = false;
              this.cdRef.detectChanges(); // Trigger change detection
            }
          }),
          catchError((error) => {
            console.error('Diary update failed:', error);
            this.snackBar.open('Diary update failed', 'Close', {
              duration: 3000,
            });
            this.show_spinner = false;
            this.cdRef.detectChanges(); // Trigger change detection
            return [];
          }),
          finalize(() => {
            console.log('Finalizing diary update');
            this.show_spinner = false;
            this.cdRef.detectChanges(); // Ensure spinner stops
            this.router.navigate(['Diary']);
          })
        )
        .subscribe()
    );
  }

  createDiary(username: string) {
    console.log('Starting diary creation');

    this.subscriptions.add(
      this.diaryService
        .create_diary({ username, content: this.diaryEntry })
        .pipe(
          tap((resp) => {
            console.log('Diary entry created:', resp);
          }),
          catchError((error) => {
            console.error('Diary creation failed:', error);
            this.snackBar.open('Diary creation failed', 'Close', {
              duration: 3000,
            });
            this.show_spinner = false;
            this.cdRef.detectChanges(); // Trigger change detection
            return [];
          }),
          finalize(() => {
            console.log('Finalizing diary creation');
            this.show_spinner = false;
            this.cdRef.detectChanges(); // Ensure spinner stops
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.subscriptions.unsubscribe();
    console.log('On Destroyed is called');
  }
}
