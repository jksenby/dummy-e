import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { AuthService } from 'src/app/cors/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Popover, PopoverModule } from 'primeng/popover';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    PopoverModule,
    TextareaModule
  ],
  providers: [AuthService, MessageService],
})
export class ProfileComponent implements OnInit {
  public isLoading: boolean = false;
  public passwordForm: FormGroup;
  public sshKeyPath: string = '';
  public sshKeyPass: string = '';

  constructor(
    private _authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group(
      {
        oldPassword: this.fb.control('', Validators.required),
        confirmationPassword: this.fb.control('', Validators.required),
        newPassword: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          this.hasNumber,
          this.hasSpecialCharacter,
          this.hasUppercase,
        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this._authService.getCurrentUser().pipe(finalize(() => this.isLoading = false)).subscribe({
          next: (user: any) => {
            this.sshKeyPath = user.ssh_key_path;
          }, error: () => {
            this.messageService.add({
              severity: 'error',
              detail: 'Could not receive user data'
            });
          }
        })
  }

  public onSubmitChangePassword() {
    if (this.passwordForm.invalid) {
      debugger;
      if (this.passwordForm.hasError('passwordMismatch')) {
        this.messageService.add({
          severity: 'error',
          detail: 'Passwords do not match',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          detail:
            'Password must contain at least one number, one upper case character, one special character and contain at least 8 symbols',
        });
      }
      this.passwordForm.markAllAsTouched();
      return;
    }

    this._authService
      .changePassword({
        current_password: this.passwordForm.get('oldPassword')?.value,
        new_password: this.passwordForm.get('newPassword')?.value,
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            detail: 'Password successfully changed',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            detail: 'Error occured. Try later',
          });
        },
      });
  }

  public updateSSHKeyInfo(op: Popover, event: MouseEvent) {
    this.isLoading = true;
    this._authService.updateSSHKey(this.sshKeyPath, this.sshKeyPass).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          detail: 'SSH Key successfully updated'
        });

        op.toggle(event);
        this.sshKeyPass = '';
        this.sshKeyPath = '';
      }, error: () => {
        this.messageService.add({
          severity: 'error',
          detail: "Couldn't update data about SSH Key"
        })
      }
    })
  }

  // Custom validator to check if the password contains at least one uppercase letter
  private hasUppercase(control: AbstractControl) {
    var value = control.value;
    if (value && !/[A-Z]/.test(value)) {
      return { uppercase: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one number
  private hasNumber(control: AbstractControl) {
    var value = control.value;
    if (value && !/\d/.test(value)) {
      return { number: true };
    }
    return null;
  }

  // Custom validator to check if the password contains at least one special character
  private hasSpecialCharacter(control: AbstractControl) {
    var value = control.value;
    if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(group: AbstractControl) {
    var password = group.get('password');
    var confirmPassword = group.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      group.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  public logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
