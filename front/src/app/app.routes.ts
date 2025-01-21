import { Routes } from '@angular/router';
import { VmListComponent } from './components/vm-list/vm-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
export const routes: Routes = [
  { path: '', component: ProjectsComponent, title: 'Список проектов' },
  { path: 'servers', component: VmListComponent, title: 'Список хостов' },
];
