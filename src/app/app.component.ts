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
  ],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(
    private primeng: PrimeNG,
    private authService: AuthService
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
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
    this.isLoggedIn = this.authService.isAuthenticatedUser();
  }
}
