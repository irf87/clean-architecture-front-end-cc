import { ITask, TaskStatus } from '../domain/TaskTypes';

export interface ITaskRepository {
  getAllTasks(): Promise<ITask[]>;
  getTasksByStatus(status: TaskStatus): Promise<ITask[]>;
  createTask(task: Partial<ITask>): Promise<ITask>;
  updateTask(taskId: string, updates: Partial<ITask>): Promise<ITask>;
  deleteTask(taskId: string): Promise<void>;
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<ITask>;
} 