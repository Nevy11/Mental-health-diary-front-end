import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { audio_data, MicDialogue } from './mic-dialogue';

@Injectable({
  providedIn: 'root',
})
export class MicDialogueService {
  constructor(private http: HttpClient) {}
  sendAudio(formData: FormData) {
    let url = `http://localhost:8000/api/upload_audio/`;
    return this.http.post(url, formData);
  }
  sendAudioToRust(data: FormData) {
    let url = 'http://localhost:8080/upload_audio';
    return this.http.post(url, data);
  }
  convert_audio_rust(data: FormData) {
    let url = 'http://localhost:8080/transcribe';
    return this.http.post<audio_data>(url, data);
  }
}
