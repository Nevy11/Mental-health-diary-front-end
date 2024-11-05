import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AiService } from '../ai.service';
import { LoginService } from '../../login/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  styleUrl: './ai-display.component.scss',
})
export class AiDisplayComponent {
  bot_name: string = 'Therapist';
  messages = [
    { user: this.bot_name, text: 'Hello! How can I assist you today?' },
  ];
  username!: string;
  newMessage = '';

  constructor(
    private router: Router,
    private aiService: AiService,
    private loginService: LoginService
  ) {}

  sendMessage() {
    this.username = this.loginService.get_name_of_user;
    if (this.newMessage.trim() !== '') {
      const question = this.newMessage;
      // Add user's message to chat
      this.messages.push({ user: this.username, text: this.newMessage });

      // // Simulate bot response
      // setTimeout(() => {
      //   this.messages.push({ user: 'Bot', text: 'This is a bot response.' });
      // }, 1000);

      this.aiService
        .ask_model_question({ question: this.newMessage })
        .subscribe((resp) => {
          console.log(resp);
          this.messages.push({ user: this.bot_name, text: resp.answer });
          console.log(question);
          this.aiService
            .create_ai({
              username: this.username,
              question: question,
              answer: resp.answer,
            })
            .subscribe((resp) => {
              console.log(resp);
            });
        });

      // Clear input
      this.newMessage = '';
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
  }
  startRecording() {
    console.log('Started recording...');
  }
  toDashboard() {
    this.router.navigate(['dashboard']);
  }
}
