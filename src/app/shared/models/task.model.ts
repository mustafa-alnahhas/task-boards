export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done'
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
  }