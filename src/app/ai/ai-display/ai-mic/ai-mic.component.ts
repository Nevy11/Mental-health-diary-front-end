import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, Subscription, switchMap, tap } from 'rxjs';
import { AiMicService } from './ai-mic.service';
import { LoginService } from '../../../login/login.service';
import { Router } from '@angular/router';
import { MicDialogueService } from '../../../diary/mic-dialogue/mic-dialogue.service';
import { AiService } from '../../ai.service';
import { AiDisplayService } from '../ai-display.service';

@Component({
  selector: 'diary-ai-mic',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './ai-mic.component.html',
  styleUrl: './ai-mic.component.scss',
})
export class AiMicComponent implements OnInit, OnDestroy {
  show_spinner = false;
  mediaRecorder: MediaRecorder | undefined;
  audio_chunks: Blob[] = [];
  diaryEntry: string = '';
  subscriptions: Subscription = new Subscription();
  question!: string;
  answer!: string;
  constructor(
    private snackBar: MatSnackBar,
    private aiMicService: AiMicService,
    private micDialogueService: MicDialogueService,
    private loginService: LoginService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private aiService: AiService,
    private aiDisplayService: AiDisplayService
  ) {}
  async ngOnInit(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        this.audio_chunks.push(event.data);
      };
      this.mediaRecorder.start();
    } catch (error) {
      this.router.navigate(['Mental AI']);
      this.snackBar.open(`Microphone access denied: ${error}`, 'Close', {
        duration: 3000,
      });
    }
  }

  convert_audio_text() {
    this.show_spinner = true;
    this.cdRef.detectChanges();
    if (!this.mediaRecorder) {
      console.warn('Media Recorder is not available');
      this.show_spinner = false;
      this.cdRef.detectChanges();
      return;
    }
    this.mediaRecorder.onstop = async () => {
      console.log('Media recorder is stopped');
      const audioBlob = new Blob(this.audio_chunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.wav');
      this.subscriptions.add(
        this.micDialogueService
          .convert_audio_rust(formData)
          .pipe(
            tap((resp) => {
              console.log(resp);
              if (resp) {
                this.question = resp.message;
                this.aiDisplayService
                  .query({ question: this.question })
                  .subscribe((resp) => {
                    this.aiService
                      .ask_model_question({
                        question: this.question,
                        context: resp.context,
                      })
                      .pipe(
                        tap((resp) => {
                          console.log(resp);
                          this.answer = resp.answer;
                          this.aiService
                            .read_one_ai({
                              username: this.loginService.get_name_of_user,
                            })
                            .pipe(
                              tap((resp) => {
                                console.log(resp);
                                if (resp.data.length > 0) {
                                  // update the ai data service
                                  this.aiService
                                    .create_ai({
                                      username:
                                        this.loginService.get_name_of_user,
                                      question: this.question,
                                      answer: this.answer,
                                    })
                                    .subscribe((resp) => {
                                      console.log(resp);
                                    });
                                }
                              })
                            )
                            .subscribe();
                        })
                      )
                      .subscribe();
                  });
              }
            }),
            finalize(() => {
              console.log('Finalizing audio conversion');
              this.show_spinner = false;
              this.cdRef.detectChanges();
              this.router.navigate(['Mental AI']);
            })
          )
          .subscribe()
      );
      this.audio_chunks = [];
    };
    this.mediaRecorder.stop();
  }
  ngOnDestroy(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.subscriptions.unsubscribe();
  }
}
