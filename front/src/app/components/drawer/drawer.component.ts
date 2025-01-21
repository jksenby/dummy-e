import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer',
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    RouterModule,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: MouseEvent): void {
    this.drawerRef.close(e);
  }

  visible: boolean = false;
}
