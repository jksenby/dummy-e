import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { HostService } from '../../core/services/host.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-server-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './add-server-dialog.component.html',
  styleUrl: './add-server-dialog.component.scss',
  providers: [DialogService, HostService, MessageService],
})
export class AddServerDialogComponent {
  public serverForm: FormGroup;
  public invalidForm: boolean = false;
  public host: any;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private _hostsService: HostService,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private dialogService: DialogService
  ) {
    this.host = this.config.data;
    this.serverForm = this._fb.group({
      name: this._fb.control(this.host?.name ?? null),
      ip1: this._fb.control(this.host?.ip1 ?? null),
      project: this._fb.control(this.host?.project ?? null),
      ssh_type: this._fb.control(this.host?.ssh_type ?? null),
      ssh_key: this._fb.control(this.host?.ssh_key ?? null),
      login: this._fb.control(this.host?.login ?? null),
      password: this._fb.control(this.host?.password ?? null),
    });
  }

  public onSubmit() {
    if (this.serverForm.invalid) {
      this.invalidForm = true;
      return;
    }

    const body = {
      id: this.host?.id ?? undefined,
      name: this.serverForm.get('name')?.value,
      ip1: this.serverForm.get('ip1')?.value,
      project: this.serverForm.get('project')?.value,
      ssh_type: this.serverForm.get('ssh_type')?.value,
      ssh_key: this.serverForm.get('ssh_key')?.value,
      login: this.serverForm.get('login')?.value,
      password: this.serverForm.get('password')?.value,
    };

    const hostObservable = this.host
      ? this._hostsService.putHost(body)
      : this._hostsService.postHost(body);
    hostObservable.subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          summary: 'Post error',
          detail: error?.body,
          severity: 'error',
        });
      },
    });
  }

  public onDelete() {
    this._hostsService.deleteHost(this.host.id).subscribe({
      next: () => {
        this.dialogRef.close(false);
      },
      error: (error) => {
        this.messageService.add({
          summary: 'Delete error',
          detail: error?.body,
          severity: 'error',
        });
      },
    });
  }
}
