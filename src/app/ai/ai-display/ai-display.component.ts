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
            // let show_form = false;
            // if (show_form) {
            //   this.aiService
            //     .ask_mixtral_model({ question: question })
            //     .pipe(
            //       tap((resp) => {
            //         console.log('Response: ', resp);
            //         this.messages = [
            //           ...this.messages,
            //           { user: this.bot_name, text: resp.answer },
            //         ];
            //         this.cdr.markForCheck();
            //         this.aiService
            //           .create_ai({
            //             username: this.username,
            //             question: resp.question,
            //             answer: resp.answer,
            //           })
            //           .subscribe((createResp) => {
            //             console.log(createResp);
            //           });
            //       })
            //     )
            //     .subscribe();
            // } else {
            //   this.aiService
            //     .ask_mistral_model_others({
            //       question: question,
            //       messages: [
            //         {
            //           role: 'user',
            //           content: 'Hello',
            //         },
            //         {
            //           role: 'assistant',
            //           content:
            //             "Hello! How can I help you today? If you have any questions about a specific topic, feel free to ask. I'll do my best to provide a clear and concise answer. If you want to learn about a topic, you can also ask me to explain it. I can explain concepts in a way that is easy to understand, even if you don't have prior knowledge of the subject. I'm here to help you learn and understand.",
            //         },
            //         {
            //           role: 'user',
            //           content: 'How can i cook pancakes?',
            //         },
            //         {
            //           role: 'assistant',
            //           content:
            //             "Sure, I'd be happy to help you make pancakes! Here is a simple recipe that you can follow:\n\nIngredients:\n\n* 1 cup all-purpose flour\n* 2 tablespoons white sugar\n* 1 teaspoon baking powder\n* 1/2 teaspoon baking soda\n* 1/4 teaspoon salt\n* 3/4 cup buttermilk\n* 1/2 cup milk\n* 1 egg\n* 2 tablespoons butter, melted\n* Vegetable oil or cooking spray, for frying\n\nInstructions:\n\n1. In a large bowl, whisk together the flour, sugar, baking powder, baking soda, and salt.\n2. In a separate bowl, whisk together the buttermilk, milk, egg, and melted butter.\n3. Add the wet ingredients to the dry ingredients and stir until just combined. It's okay if there are a few lumps in the batter.\n4. Preheat a large skillet or griddle over medium heat. Lightly coat the surface with vegetable oil or cooking spray.\n5. For each pancake, pour about 1/4 cup of batter onto the skillet. Cook until bubbles form on the surface of the pancake and the edges look set, about 2-3 minutes.\n6. Flip the pancake and cook until the other side is golden brown, about 2 minutes.\n7. Serve the pancakes warm, with your favorite toppings, such as maple syrup, fresh fruit, or whipped cream.\n\nI hope this helps! Let me know if you have any questions or if you'd like me to explain any of the steps in more detail. I'm here to help!",
            //         },
            //       ],
            //     })
            //     .pipe(
            //       tap((resp) => {
            //         console.log('Response: ', resp);
            //         this.messages = [
            //           ...this.messages,
            //           { user: this.bot_name, text: resp.answer },
            //         ];
            //         this.cdr.markForCheck();
            //         this.aiService
            //           .create_ai({
            //             username: this.username,
            //             question: resp.question,
            //             answer: resp.answer,
            //           })
            //           .subscribe((createResp) => {
            //             console.log(createResp);
            //           });
            //       })
            //     )
            //     .subscribe();
            // }

            /*
            if (last_answer) {
              // console.log('last answer is true');
              this.aiService
                .ask_model_question({
                  question: question,
                  // context: last_answer,
                  context: my_questions,
                })
                .pipe(
                  tap((resp) => {
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
                  })
                )
                .subscribe();
            } else {
              // cdashboardonsole.log('last answer is false');
              this.aiService
                .ask_new_model_question({
                  question: question,
                  context: [],
                })
                .pipe(
                  tap((resp) => {
                    console.log(resp);
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
                  })
                )
                .subscribe();
            }
*/
            // Add bot's response

            // this.scrollToBottom();
            // this.cdr.detectChanges();
            // });

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
    this.matSnackBar.open(`I have no memory of you :)`);
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
