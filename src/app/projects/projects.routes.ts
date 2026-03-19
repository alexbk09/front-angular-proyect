import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { ProjectFormComponent } from './project-form.component';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'nuevo',
    component: ProjectFormComponent
  },
  {
    path: 'editar/:id',
    component: ProjectFormComponent
  }
];
