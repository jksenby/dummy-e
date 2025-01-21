import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [CommonModule, CardModule, PanelModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects = [
    {
      name: 'happy.test.app',
    },
    {
      name: 'apple.test.app',
    },
    {
      name: 'node.test.app',
    },
    {
      name: 'panel.test.app',
    },
  ];
}
