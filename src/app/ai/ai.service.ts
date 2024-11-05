import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Ai,
  AIQAUpdate,
  AIReadOne,
  AiUsernameUpdate,
  AnswerModel,
  QuestionModel,
  ReturnAi,
  ReturnAiReadOne,
} from './ai';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}
  create_ai(data: Ai) {
    let url = 'http://127.0.0.1:8080/ai_create';
    return this.http.post<ReturnAi>(url, data);
  }
  read_one_ai(data: AIReadOne) {
    let url = 'http://127.0.0.1:8080/ai_read_one';
    return this.http.post<ReturnAiReadOne>(url, data);
  }
  delete_one_ai(data: AIReadOne) {
    let url = 'http://127.0.0.1:8080/ai_delete';
    return this.http.post<ReturnAiReadOne>(url, data);
  }
  udpate_username_ai(data: AiUsernameUpdate) {
    let url = 'http://127.0.0.1:8080/ai_username_update';
    return this.http.patch<ReturnAi>(url, data);
  }
  update_question_ai(data: AIQAUpdate) {
    let url = 'http://127.0.0.1:8080/ai_question_update';
    return this.http.patch<ReturnAi>(url, data);
  }
  update_answer_ai(data: AIQAUpdate) {
    let url = 'http://127.0.0.1:8080/ai_answer_update';
    return this.http.patch<ReturnAi>(url, data);
  }
  ask_model_question(data: QuestionModel) {
    let url = 'http://127.0.0.1:8000/api/ask/';
    return this.http.post<AnswerModel>(url, data);
  }
}
