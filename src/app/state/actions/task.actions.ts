import { Task } from '../../shared/models/task.model';

export class GetTasks {
  static readonly type = '[Tasks] Get All';
}

export class GetTasksSuccess {
  static readonly type = '[Tasks] Get All Success';
  constructor(public tasks: Task[]) {}
}

export class GetTasksFailure {
  static readonly type = '[Tasks] Get All Failure';
  constructor(public error: string) {}
}

export class CreateTask {
  static readonly type = '[Tasks] Create';
  constructor(public payload: Omit<Task, 'id'>) {}
}

export class UpdateTask {
  static readonly type = '[Tasks] Update';
  constructor(public payload: Task) {}
}

export class UpdateTaskStatus {
  static readonly type = '[Tasks] Update Status';
  constructor(public id: string, public status: Task['status']) {}
}
