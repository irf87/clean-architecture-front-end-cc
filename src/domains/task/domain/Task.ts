import { ITask, TaskStatus } from './TaskTypes';

export class Task implements ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;

  constructor(task: Partial<ITask>) {
    this.id = task.id || crypto.randomUUID();
    this.title = task.title || '';
    this.description = task.description || '';
    this.status = task.status || 'pending';
    this.createdAt = task.createdAt || new Date();
    this.updatedAt = task.updatedAt || new Date();
    this.isFavorite = task.isFavorite || false;
  }

  updateStatus(status: TaskStatus): void {
    this.status = status;
    this.updatedAt = new Date();
  }
} 