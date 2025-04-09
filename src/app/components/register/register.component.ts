import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/cors/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CheckboxModule, InputTextModule, ButtonModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ToastModule],
  providers: [AuthService, MessageService]
})
export class RegisterComponent  implements OnInit {
  public registerForm: FormGroup

  constructor(private fb: FormBuilder, private _authService: AuthService, private messageService: MessageService, private router: Router) {
    this.registerForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }

  ngOnInit() {}

  onRegister() {
      if(this.registerForm.invalid) return;

      this._authService.register({email: this.registerForm.value['email'], password: this.registerForm.value['password']}).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['login'])
        }, error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            detail: 'Error occured. Try later'
          })
        }
      })
  }

}
