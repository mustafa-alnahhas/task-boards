import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { CreateTask, UpdateTask } from '../../../../state/actions/task.actions';
import { Task, TaskStatus } from '../../../../shared/models/task.model';
import { futureDateValidator } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form: FormGroup;
  
  isEditMode = false;
  TaskStatus = TaskStatus; // expose enum to template
  statusOptions = Object.values(TaskStatus);
  minDate = new Date(); // Sets today as minimum selectable date

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<TaskFormComponent>, // Keep private
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required, , futureDateValidator()],
      status: [TaskStatus.TODO]
    });

    if (data) {
      this.isEditMode = true;
      this.form.patchValue({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null
      });
    }

  }

 

  onSubmit() {
    if (this.form.invalid) return;
  
    const formValue = {
      ...this.form.value,
      dueDate: this.formatDueDate(this.form.value.dueDate)
    };
  
    if (this.isEditMode) {
      this.store.dispatch(new UpdateTask(formValue as Task));
    } else {
      // For new tasks, let the service generate the ID
      const { id, ...taskData } = formValue;
      this.store.dispatch(new CreateTask(taskData));
    }
  
    this.dialogRef.close();
  }
  
  private formatDueDate(date: Date | string): string {
    // If already ISO string (from loaded task), return as-is
    if (typeof date === 'string') return date;
    
    // If Date object, convert to ISO string
    if (date instanceof Date) return date.toISOString();
    
    // Fallback for other cases
    return new Date(date).toISOString();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}