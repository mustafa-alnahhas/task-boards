import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Task, TaskStatus } from '../../shared/models/task.model';
import { IdGeneratorService } from './id-generator.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient,
              private idGenerator: IdGeneratorService
  ) {}

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }


  createTask(task: Omit<Task, 'id'>): Observable<Task> {
      const newTask = {
        ...task,
        id: this.idGenerator.generateId() // Generate ID before POST
      };
      return this.http.post<Task>(this.apiUrl, newTask);
    }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, {status});
  }
}