import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MicDialogue } from './mic-dialogue';

@Injectable({
  providedIn: 'root',
})
export class MicDialogueService {
  constructor(private http: HttpClient) {}
  sendAudio(formData: FormData) {
    let url = `http://localhost:8000/api/upload_audio/`;
    return this.http.post(url, formData);
  }
  sendAudioToRust(data: MicDialogue) {
    let url = 'http://localhost:8080/speech-to-text';
    this.http.post(url, data);
  }
}
