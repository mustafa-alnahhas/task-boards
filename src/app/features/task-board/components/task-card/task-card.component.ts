import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  // Add this method to check if task is overdue
  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const today = new Date();
    // Clear time parts for accurate date comparison
    today.setHours(0, 0, 0, 0);
    return due < today;
  }
}
