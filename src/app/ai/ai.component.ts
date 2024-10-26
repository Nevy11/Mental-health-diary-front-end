import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'diary-ai',
  standalone: true,
  imports: [MatIconModule,FormsModule,],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AIComponent {
  userInput = '';

  sendMessage() {
    console.log('Message sent:', this.userInput);
  
  }

  startRecording() {
    console.log('Started recording...');
    
  }


}
