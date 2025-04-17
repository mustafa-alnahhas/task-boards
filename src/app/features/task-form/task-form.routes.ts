import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const TASK_FORM_ROUTES: Routes = [
  {
    path: 'new', // path is /tasks/new
    component: TaskFormComponent
  },
  {
    path: ':id', // path is /tasks/:id
    component: TaskFormComponent
  }
];