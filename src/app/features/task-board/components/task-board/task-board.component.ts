import { Component } from '@angular/core';
import { Task, TaskStatus } from '../../../../shared/models/task.model';
import { TaskSelectors } from '../../../../state/selectors/task.selectors';
import { Store } from '@ngxs/store';
import { GetTasks, UpdateTaskStatus } from '../../../../state/actions/task.actions';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/components/task-form/task-form.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {
  TaskStatus = TaskStatus;
  statuses = Object.values(TaskStatus);

  // Selectors
  tasks$ = this.store.select(TaskSelectors.allTasks);
  loading$ = this.store.select(TaskSelectors.loading);
  todoTasks$ = this.store.select(TaskSelectors.todoTasks);
  inProgressTasks$ = this.store.select(TaskSelectors.inProgressTasks);
  doneTasks$ = this.store.select(TaskSelectors.doneTasks);

  
  
  

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(new GetTasks()); 
  }

   // Update your onDrop method with proper typing
   onDrop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    if (!event.container.data || !event.previousContainer.data) return;
    
    if (event.previousContainer === event.container) {
      // Reorder within same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Transfer between lists
      const task = event.previousContainer.data[event.previousIndex];
      this.store.dispatch(new UpdateTaskStatus(task.id, newStatus));
    }
  }

  openTaskForm(task?: Task) {
    
    this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task || null
    });
  }

}
