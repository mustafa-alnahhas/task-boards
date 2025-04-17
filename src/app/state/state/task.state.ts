import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, updateItem } from '@ngxs/store/operators';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';
import { CreateTask, GetTasks, GetTasksFailure, GetTasksSuccess, UpdateTask, UpdateTaskStatus } from '../actions/task.actions';
import { catchError, tap, throwError } from 'rxjs';

export interface TaskStateModel {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    loading: false,
    error: null
  }
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Action(GetTasks)
  getTasks(ctx: StateContext<TaskStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.taskService.getTasks().pipe(
      tap(tasks => ctx.dispatch(new GetTasksSuccess(tasks))),
      catchError(error => ctx.dispatch(new GetTasksFailure(error.message)))
    );
  }

  @Action(GetTasksSuccess)
  getTasksSuccess(ctx: StateContext<TaskStateModel>, { tasks }: GetTasksSuccess) {
    ctx.patchState({ tasks, loading: false });
  }

  @Action(GetTasksFailure)
  getTasksFailure(ctx: StateContext<TaskStateModel>, { error }: GetTasksFailure) {
    ctx.patchState({ error, loading: false });
  }

  @Action(CreateTask)
  createTask(ctx: StateContext<TaskStateModel>, { payload }: CreateTask) {
    ctx.patchState({ loading: true });
    return this.taskService.createTask(payload).pipe(
      tap(newTask => {
        ctx.setState(patch({
          tasks: [...ctx.getState().tasks, newTask],
          loading: false
        }));
      }),
      catchError(error => {
        ctx.patchState({ error: error.message, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, { payload }: UpdateTask) {

    ctx.patchState({ loading: true });
    return this.taskService.updateTask(payload).pipe(
      tap(updatedTask => {
        ctx.setState(patch({
          tasks: updateItem<Task>(task => task?.id === updatedTask.id, updatedTask),
          loading: false
        }));
      }),
      catchError(error => {
        ctx.patchState({ error: error.message, loading: false });
        return throwError(() => error);
      })
    );
  }

  @Action(UpdateTaskStatus)
  updateTaskStatus(ctx: StateContext<TaskStateModel>, { id, status }: UpdateTaskStatus) {
    const task = ctx.getState().tasks.find(task => task.id === id);
    if (!task) return;

    ctx.patchState({ loading: true });
    
    return this.taskService.updateTaskStatus(id, status).pipe(
      tap(() => {
        ctx.setState(patch({
          tasks: updateItem<Task>(task => task?.id === id, { ...task, status }),
          loading: false
        }));
      }),
      catchError(error => {
        ctx.patchState({ error: error.message, loading: false });
        return throwError(() => error);
      })
    );
  }

}