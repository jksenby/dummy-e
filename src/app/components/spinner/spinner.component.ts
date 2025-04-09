import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'd-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [ProgressSpinnerModule]
})
export class SpinnerComponent  implements OnInit {
  @Input({required: true}) public bindedElement: HTMLElement| null = null;

  constructor() { }

  ngOnInit() {
    if(this.bindedElement)
      this.bindedElement.style.position = 'relative'
  }

}
