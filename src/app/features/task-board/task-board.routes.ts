import { Routes } from '@angular/router';
import { TaskBoardComponent } from './components/task-board/task-board.component';


export const TASK_BOARD_ROUTES: Routes = [
  {
    path: '', // Will match the root path
    component: TaskBoardComponent
  }
];