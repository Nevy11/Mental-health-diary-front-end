import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AiService } from './ai.service';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AiDisplayComponent } from './ai-display/ai-display.component';

@Component({
    selector: 'diary-ai',
    imports: [
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        AiDisplayComponent,
    ],
    templateUrl: './ai.component.html',
    styleUrl: './ai.component.scss'
})
export class AIComponent {
  // constructor(
  //   private router: Router,
  //   private aiService: AiService,
  //   private loginService: LoginService
  // ) {}
  // userInput = '';
  // ngOnInit(): void {
  //   this.aiService
  //     .read_one_ai({ username: this.loginService.get_name_of_user })
  //     .subscribe((resp) => {
  //       console.log(resp);
  //     });
  // }
  // sendMessage() {
  //   this.aiService
  //     .ask_model_question({ question: this.userInput })
  //     .subscribe((resp) => {
  //       console.log(resp);
  //     });
  //   // this.aiService
  //   //   .create_ai({
  //   //     username: this.loginService.get_name_of_user,
  //   //     question: this.userInput,
  //   //     answer: 'This is a default value without the artificial intelligence',
  //   //   })
  //   //   .subscribe((resp) => {
  //   //     console.log(resp);
  //   //   });
  //   console.log('Message sent:', this.userInput);
  // }
  // startRecording() {
  //   console.log('Started recording...');
  // }
  // toDashboard() {
  //   this.router.navigate(['dashboard']);
  // }
  // clear() {
  //   this.aiService
  //     .delete_one_ai({
  //       username: this.loginService.get_name_of_user,
  //     })
  //     .subscribe((resp) => {
  //       console.log(resp);
  //       for (let index = 0; index < resp.data.length; index++) {
  //         const element = resp.data[index];
  //         console.log(element);
  //       }
  //     });
  // }
}
