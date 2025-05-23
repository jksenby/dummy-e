import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { DrawerComponent } from './components/drawer/drawer.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from './cors/services/auth.service';
import { RequestsService } from './cors/services/requests.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    DrawerComponent,
    RouterOutlet,
    ButtonModule,
    RouterLink,
    AvatarModule,
    CommonModule,
    RippleModule,
    ToastModule
  ],
  styleUrls: ['app.component.scss'],
  providers: [RequestsService, MessageService]
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public conversations: any[] | undefined;

  constructor(
    private primeng: PrimeNG,
    private authService: AuthService,
    private _requestsService: RequestsService
  ) {
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
    document
      .querySelector('html')
      ?.classList.add(localStorage.getItem('theme') ?? 'dark');
    if (
      document.querySelector('body') &&
      localStorage.getItem('theme') === 'light'
    )
      document.querySelector('body')!.style.backgroundColor = '#fff';

      this.getAllConversations();
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.isLoggedIn = this.authService.isAuthenticatedUser();
  }

  public handleRefreshConversations() {
    this.getAllConversations();
  }

  public getAllConversations() {
    this._requestsService.getAllConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations;
      }
    })
  }
}
