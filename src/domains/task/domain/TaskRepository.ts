import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';

export interface ITaskRepository {
  getAllTasks(userEmail: string): TaskNode[];
  createTask(task: Partial<TaskNode>, userEmail: string): Promise<TaskNode>;
  updateTask(taskId: string, updates: Partial<TaskNode>, userEmail: string): Promise<TaskNode>;
  deleteTask(taskId: string, userEmail: string): void;
  updateTaskStatus(taskId: string, status: TaskStatus, userEmail: string): Promise<TaskNode>;
  toggleFavorite(taskId: string, userEmail: string): Promise<TaskNode>;
  setError(error: string): void;
} 