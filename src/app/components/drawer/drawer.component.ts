import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RequestsService } from 'src/app/cors/services/requests.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-drawer',
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    RouterModule,
    FontAwesomeModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  providers: [RequestsService, MessageService]
})
export class DrawerComponent {
  @Input({required: true}) public conversations: any[] | undefined;
  @Output() public refreshConversations: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _requestsService: RequestsService, private router: Router, private messageService: MessageService) {

  }

  public createConversation() {
    this._requestsService.createConversation().subscribe({next: (newConversation: any) => {
      console.log(newConversation);
      this.router.navigate(['requests', newConversation.id])
      this.refreshConversations.emit()
    }})
  }

  public deleteConversation(id: number) {
    this._requestsService.deleteConversation(id).subscribe({
      next: () => {
        this.messageService.add({
          detail: "Conversation was deleted",
          severity: 'success'
        });
        this.refreshConversations.emit();
      },
      error: (err) => {
        this.messageService.add({
          detail: "Couldn't delete conversation",
          severity: 'error'
        })
      }
    })
  }
}