import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TASK_BOARD_ROUTES } from './task-board.routes';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    TaskBoardComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TASK_BOARD_ROUTES),
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class TaskBoardModule { }