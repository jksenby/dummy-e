import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { PromptService } from '../../core/services/prompt.service';
import { finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    ToastModule,
    MessageModule,
    InputTextModule,
    ToolbarModule,
    SplitButtonModule,
    IconFieldModule,
    InputIconModule,
    FileUploadModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [PromptService, DialogService, MessageService],
})
export class ChatComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  public isLoading: boolean = true;
  uploadedFiles: any[] = [];

  constructor(
    private _promptService: PromptService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  public sendPrompt(prompt: string) {
    if (!prompt.trim()) return;
    this._promptService.sendPrompt(prompt, this.uploadedFiles[0]).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Get response from server',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Get error from server',
          detail: typeof error?.body === 'string' ? error.body : '',
        });
      },
    });
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  public hosts = [];
}
