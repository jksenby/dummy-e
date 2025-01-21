import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PromptService {
  constructor(private http: HttpClient) {}

  public sendPrompt(prompt: string, file: File) {
    return this.http.post('http://localhost:3001/api/prompt', {
      prompt,
      file,
    });
  }
}
