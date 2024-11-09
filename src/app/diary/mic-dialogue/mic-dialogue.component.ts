import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MicDialogueService } from './mic-dialogue.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'diary-mic-dialogue',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './mic-dialogue.component.html',
  styleUrls: ['./mic-dialogue.component.scss'],
})
export class MicDialogueComponent implements OnInit, OnDestroy {
  dialogRef = inject(DialogRef);
  mediaRecorder: MediaRecorder | undefined;
  audioChunks: Blob[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private micDialogueService: MicDialogueService,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('mic dialogue is initialized');
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
      console.error('Microphone access is denied');
    }
  }

  ngOnDestroy(): void {
    console.log('Mic dialogue is destroyed');
    if (this.mediaRecorder) {
      console.log('Media Recorder is not undefined');

      // Set the onstop handler before stopping
      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        console.log(`AudioBlob: ${audioBlob}`);

        // Prepare form data
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');
        console.log('form data: ', formData);

        // Send the form data
        this.micDialogueService.sendAudio(formData).subscribe((resp) => {
          console.log(resp);
        });

        // Reset chunks
        this.audioChunks = [];
      };

      this.mediaRecorder.stop();
    } else {
      console.warn('Failed to record the media');
    }
  }
}
