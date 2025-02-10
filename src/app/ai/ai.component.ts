import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  styleUrl: './ai.component.scss',
})
export class AIComponent {
  width = 100;
  height = 100;
}
