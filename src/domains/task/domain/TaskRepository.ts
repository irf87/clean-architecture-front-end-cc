import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';

export interface ITaskRepository {
  getAllTasks(): TaskNode[];
  getTasksByStatus(status: TaskStatus): TaskNode[];
  createTask(task: Partial<TaskNode>): Promise<TaskNode>;
  updateTask(taskId: string, updates: Partial<TaskNode>): Promise<TaskNode>;
  deleteTask(taskId: string): void;
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<TaskNode>;
} 