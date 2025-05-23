import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/cors/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CheckboxModule, InputTextModule, ButtonModule, RouterModule, FormsModule, ReactiveFormsModule, ToastModule],
  providers: [AuthService, MessageService]
})
export class LoginComponent  implements OnInit {
  public loginForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private _authService: AuthService, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    })
   }
  ngOnInit(): void {
  }

  public onLogin() {
    this._authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.access_token)
        this.router.navigate(['/profile'], {queryParams: {initial: true}}).then(() => location.reload());
      },error: err => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          detail: 'Error occured. Check your username and password'
        })
      }
    })
  }
}
