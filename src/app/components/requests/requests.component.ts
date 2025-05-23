import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from '../spinner/spinner.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequestsService } from 'src/app/cors/services/requests.service';
import { finalize } from 'rxjs';
import { marked } from 'marked';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    ButtonModule,
    RouterModule,
    ChipModule,
    ToastModule,
    SpinnerComponent,
    BreadcrumbModule,
    RippleModule,
    InputTextModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss',
  providers: [MessageService, RequestsService],
})
export class RequestsComponent implements OnInit {
  public isLoading: boolean = false;
  public inputForm: FormGroup = new FormGroup({
    inputValue: new FormControl('', Validators.required),
  });
  public uploadedFiles: File[] = [];
  public outputs: any[] = [];
  private conversationId: number | undefined;

  constructor(
    private messageService: MessageService,
    private _requestsSerivce: RequestsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.outputs = [];
    });

    this.activatedRoute.params.subscribe((params) => {
      this.conversationId = params['conversationId'];

      if (this.conversationId)
        this._requestsSerivce
          .getMessages(this.conversationId)
          .subscribe((history) =>
            history.forEach((item) =>
              this.outputs.push({
                isUser: item.role === 'user',
                value: marked.parse(
                  (item.content as string).split('<----->')[0]
                ),
              })
            )
          );
    });
  }

  ngOnInit(): void {}

  public onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  public onSubmit() {
    if (!this.conversationId) return;
    this.isLoading = true;

    if (this.inputForm.get('inputValue')?.value !== '') {
      this.outputs.push({
        value: marked.parse(this.inputForm.get('inputValue')?.value),
        isUser: true,
      });
    }

    this._requestsSerivce
      .sendRequest(this.conversationId, {
        ...this.inputForm.value,
        file: this.uploadedFiles[0],
      })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response: any) => {
          this.uploadedFiles = [];
          console.log(response);
          if (this.inputForm.get('inputValue')?.value !== '') {
            this.outputs.push({
              value: marked.parse(response.output),
              isUser: false,
            });
          }
          this.inputForm.get('inputValue')?.patchValue('');
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Error occured',
          });
        },
      });
  }
}
