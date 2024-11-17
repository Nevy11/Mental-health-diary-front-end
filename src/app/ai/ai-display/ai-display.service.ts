import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AiDisplay, AiDisplayReturn, ModelAI } from './ai-display';

@Injectable({
  providedIn: 'root',
})
export class AiDisplayService {
  constructor(private http: HttpClient) {}
  query(data: AiDisplay) {
    let url = 'http://localhost:8080/query';

    return this.http.post<ModelAI>(url, data);
  }
}
