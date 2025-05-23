import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private host = environment.host + 'requests/';
  constructor(private http: HttpClient) {}

  public sendRequest(conversationId: number, body: any) {
    var formData = new FormData();
    formData.append('user_input', body.inputValue);
    if(body.file)
    formData.append('file', body.file);
    return this.http.post(this.host + 'conversations/' + conversationId + '/messages', formData);
  }

  public getMessages(conversationId: number) {
    return this.http.get<any[]>(this.host + 'conversations/' + conversationId + '/messages');
  }
  
  public getFilenames() {
    return this.http.get<any[]>(this.host + 'filenames');
  }

  public deleteConversation(conversationId: number) {
    return this.http.delete(this.host + 'conversations/' + conversationId);
  }

  public getAllConversations() {
    return this.http.get<any[]>(this.host + 'conversations');
  }

  public createConversation() {
    return this.http.post(this.host + 'conversations', {})
  }

  public getConversationFiles(conversationId: number) {
    return this.http.get<any[]>(this.host + 'conversations/' + conversationId + '/files')
  }
}
