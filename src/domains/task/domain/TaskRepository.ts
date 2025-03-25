import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';

export interface ITaskRepository {
  getAllTasks(userEmail: string): TaskNode[];
  getTasksByStatus(status: TaskStatus): TaskNode[];
  createTask(task: Partial<TaskNode>, userEmail: string): Promise<TaskNode>;
  updateTask(taskId: string, updates: Partial<TaskNode>, userEmail: string): Promise<TaskNode>;
  deleteTask(taskId: string, userEmail: string): void;
  updateTaskStatus(taskId: string, status: TaskStatus, userEmail: string): Promise<TaskNode>;
} 