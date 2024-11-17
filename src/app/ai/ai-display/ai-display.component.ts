import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AiService } from '../ai.service';
import { LoginService } from '../../login/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { AiDisplayService } from './ai-display.service';

@Component({
  selector: 'diary-ai-display',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './ai-display.component.html',
  styleUrls: ['./ai-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiDisplayComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow', { static: false }) chatWindow!: ElementRef;

  bot_name: string = 'Therapist';
  messages = [
    { user: this.bot_name, text: 'Hello! How can I assist you today?' },
  ];
  username!: string;
  newMessage = '';
  name_of_user!: string;

  constructor(
    private router: Router,
    private aiService: AiService,
    private loginService: LoginService,
    private matSnackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private aiDisplayService: AiDisplayService
  ) {}

  ngOnInit(): void {
    this.name_of_user = this.loginService.get_name_of_user;
    this.aiService
      .read_one_ai({ username: this.name_of_user })
      .pipe(
        tap((resp) => {
          resp.data.forEach((data) => {
            console.log(this.messages);
            this.messages = [
              ...this.messages,
              {
                user: this.loginService.get_name_of_user,
                text: data.question,
              },
              {
                user: this.bot_name,
                text: data.answer,
              },
            ];
          });
        })
      )
      .subscribe();
    this.cdr.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.chatWindow) {
      console.log('Chat window is initialized');
    }
    this.scrollToBottom();
    this.cdr.detectChanges();
  }

  sendMessage() {
    this.username = this.loginService.get_name_of_user;
    this.cdr.detectChanges();
    if (this.newMessage.trim() !== '') {
      const question = this.newMessage;

      // Add user's message to chat
      this.messages = [
        ...this.messages,
        { user: this.username, text: this.newMessage },
      ];
      this.cdr.markForCheck(); // Notify Angular of change

      this.aiDisplayService
        .query({ question: this.newMessage })
        .subscribe((resp) => {
          console.log(resp);
          if (resp.success) {
            this.aiService
              .ask_model_question({
                question: question,
                context: resp.context,
              })
              .subscribe((resp) => {
                this.messages = [
                  ...this.messages,
                  { user: this.bot_name, text: resp.answer },
                ];
                this.cdr.markForCheck(); // Notify Angular again

                this.aiService
                  .create_ai({
                    username: this.username,
                    question: question,
                    answer: resp.answer,
                  })
                  .subscribe((createResp) => {
                    console.log(createResp);
                  });
              });
          } else {
            this.matSnackBar.open(`Internet connection Error`, 'Close', {
              duration: 3000,
            });
          }

          // Add bot's response

          this.scrollToBottom();
          this.cdr.detectChanges();
        });

      // Clear input
      this.newMessage = '';
    } else {
      this.matSnackBar.open('Invalid entry', 'Close', { duration: 3000 });
    }
  }

  clear() {
    this.aiService
      .delete_one_ai({
        username: this.loginService.get_name_of_user,
      })
      .subscribe((resp) => {
        console.log(resp);
        for (let index = 0; index < resp.data.length; index++) {
          const element = resp.data[index];
          console.log(element);
        }
      });
    this.messages = [];
    this.cdr.markForCheck(); // Notify Angular of change
  }

  startRecording() {
    console.log('Started recording...');
    this.router.navigate(['Mic Ai']);
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }

  private scrollToBottom(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.chatWindow?.nativeElement) {
          this.chatWindow.nativeElement.scrollTop =
            this.chatWindow.nativeElement.scrollHeight;
        }
      }, 0);
    });
  }
}
