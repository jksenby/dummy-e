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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormEvent } from 'src/app/cors/enums/form-event.enum';

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
    FloatLabelModule,
    CommonModule
  ],
  templateUrl: './add-server-dialog.component.html',
  styleUrl: './add-server-dialog.component.scss',
  providers: [DialogService, MessageService],
})
export class AddServerDialogComponent {
  public serverForm: FormGroup;
  public invalidForm: boolean = false;
  public host: any;
  projectId: number | null = null;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.host = this.config.data;
    this.serverForm = this._fb.group({
      name: this._fb.control(this.host?.name ?? null, Validators.required),
      ip_address: this._fb.control(this.host?.host_ip ?? null, Validators.required),
      project: this._fb.control(this.host?.project ?? null),
      username: this._fb.control(this.host?.ssh_username ?? null, Validators.required),
    });
    this.activatedRoute.params.subscribe(params => this.projectId = +params['id'])
  }

  public onSubmit() {
    if (this.serverForm.invalid) {
      this.invalidForm = true;
      return;
    }

    var body = {
      id: this.host?.id ?? undefined,
      name: this.serverForm.get('name')?.value,
      host_ip: this.serverForm.get('ip_address')?.value,
      ssh_username: this.serverForm.get('username')?.value,
    };

    // var observable: Observable<any> | null = null;
    
    //     if(this.host && this.projectId) {
    //       observable = this._hostsService.updateHost(this.projectId, this.host.id, body)
    //     } else {
    //       observable = this._hostsService.createHost(this.projectId ?? 0, body)
    //     }
    
    //     observable.subscribe({
    //       next: (response) => {
    //         this.dialogRef.close(FormEvent.SAVE);
    //       }, error: (response) => {
    //         console.error(response);
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: 'Error occured'
    //         })
    //       }
    //     })

  }

  public onDelete(id: number) {
    // if(this.projectId)
    // this._hostsService.deleteHost(this.projectId, id).subscribe({
    //   next: (response) => {
    //     this.dialogRef.close(FormEvent.DELETE)
    //   }, error: (response) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error occured'
    //     })
    //   }
    // })
  }
}
