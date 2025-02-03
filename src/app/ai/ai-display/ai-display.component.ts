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

@Component({
  selector: 'diary-ai-display',
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
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.name_of_user = this.loginService.get_name_of_user;
    this.aiService
      .read_one_ai({ username: this.name_of_user })
      .pipe(
        tap((resp) => {
          resp.data.forEach((data) => {
            // console.log(this.messages);
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
      // console.log('Chat window is initialized');
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

      let my_questions: string[] = [];
      let one_question: string = ' ';

      this.aiService
        .read_one_ai({ username: this.name_of_user })
        .pipe(
          tap((resp) => {
            resp.data.forEach((data) => {
              console.log(data.question);
              one_question.concat(data.question);
              my_questions.push(data.question);
              my_questions.push(data.answer);
            });

            let messages_model: any[] = [];
            for (let index = 0; index < this.messages.length; index++) {
              const element = this.messages[index];
              let role_user = element.user;
              let text_user = element.text;
              // console.log('role_user: ', role_user, '\ntext_user: ', text_user);
              // one_question.concat('\n', role_user, text_user);
              one_question = one_question + '\n' + role_user + '\n' + text_user;
              // console.log('one_question: ', one_question);
            }

            // console.log('one Question: ', one_question);
            // wrap it from here
            // console.log(my_questions);
            let last_answer = my_questions.pop();
            // console.log('last answer: ', last_answer);

            // i'll go with the option of asking the model new question without keeping track of the history
            // for now
            // this.aiService
            //   .ask_new_model_question({
            //     question: question,
            //     context: [],
            //   })
            //   .pipe(
            //     tap((resp) => {
            //       console.log(resp);
            //       this.messages = [
            //         ...this.messages,
            //         { user: this.bot_name, text: resp.answer },
            //       ];
            //       this.cdr.markForCheck(); // Notify Angular again

            //       this.aiService
            //         .create_ai({
            //           username: this.username,
            //           question: question,
            //           answer: resp.answer,
            //         })
            //         .subscribe((createResp) => {
            //           console.log(createResp);
            //         });
            //     })
            //   )
            //   .subscribe();

            // this.aiService
            //   .ask_flan_t5_model({ question: question })
            //   .pipe(
            //     tap((resp) => {
            //       console.log('Response: ', resp);
            //       this.messages = [
            //         ...this.messages,
            //         { user: this.bot_name, text: resp.answer },
            //       ];
            //       this.cdr.markForCheck();
            //       this.aiService
            //         .create_ai({
            //           username: this.username,
            //           question: resp.question,
            //           answer: resp.answer,
            //         })
            //         .subscribe((createResp) => {
            //           console.log(createResp);
            //         });
            //     })
            //   )
            //   .subscribe();
            this.aiService
              .read_one_ai({ username: this.loginService.get_name_of_user })
              .pipe(
                tap((resp) => {
                  let my_messages: { role: string; content: string }[] = [
                    // {
                    //   role: 'user',
                    //   content: 'What is your favourite condiment?',
                    // },
                    // {
                    //   role: 'assistant',
                    //   content:
                    //     "Well, I'm quite partial to a good squeeze of fresh lemon juice. It adds just the right amount of zesty flavour to whatever I'm cooking up in the kitchen!",
                    // },
                  ];
                  console.log(resp);
                  resp.data.forEach((data_loops) => {
                    let user_role = 'user';
                    let question = data_loops.question;
                    let ai_role = 'assistant';
                    let answer = data_loops.answer;
                    my_messages.push({ role: user_role, content: question });
                    my_messages.push({ role: ai_role, content: answer });
                  });
                  this.aiService
                    .ask_mistral_model_others({
                      question: question,
                      messages: my_messages,
                    })
                    .pipe(
                      tap((resp) => {
                        console.log('Response: ', resp);
                        this.messages = [
                          ...this.messages,
                          { user: this.bot_name, text: resp.answer },
                        ];
                        this.cdr.markForCheck();
                        this.aiService
                          .create_ai({
                            username: this.username,
                            question: resp.question,
                            answer: resp.answer,
                          })
                          .subscribe((createResp) => {
                            console.log(createResp);
                          });
                      })
                    )
                    .subscribe();
                })
              )
              .subscribe();

            // Clear input
            this.newMessage = '';

            // to here
          })
        )
        .subscribe();
    } else {
      this.matSnackBar.open('Invalid entry', 'Close', { duration: 3000 });
    }
    this.cdr.detectChanges();
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
    this.cdr.detectChanges();
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
    this.cdr.markForCheck(); // Notify Angular of change
    this.cdr.detectChanges();
    this.router.navigate(['dashboard']);
    this.matSnackBar.open(`I have no memory of you :)`, `Close`, {
      duration: 3000,
    });
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
