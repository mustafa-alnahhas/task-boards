import { createSelector, Selector } from '@ngxs/store';
import { Task, TaskStatus } from '../../shared/models/task.model';
import { TaskState, TaskStateModel } from '../state/task.state';

export class TaskSelectors {
  @Selector([TaskState])
  static allTasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  @Selector([TaskState])
  static loading(state: TaskStateModel): boolean {
    return state.loading;
  }

  @Selector([TaskState])
  static tasksByStatus(status: TaskStatus) {
    return createSelector([TaskState], (state: TaskStateModel) => {
      return state.tasks.filter(task => task.status === status);
    });
  }

  @Selector([TaskState])
  static todoTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === TaskStatus.TODO);
  }

  @Selector([TaskState])
  static inProgressTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
  }

  @Selector([TaskState])
  static doneTasks(state: TaskStateModel): Task[] {
    return state.tasks.filter(task => task.status === TaskStatus.DONE);
  }
}