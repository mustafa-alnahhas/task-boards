import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/task-board/task-board.module')
      .then(m => m.TaskBoardModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/task-form/task-form.module')
      .then(m => m.TaskFormModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];