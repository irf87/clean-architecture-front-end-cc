import { ITask, TaskStatus } from '../domain/TaskTypes';
import { ITaskRepository } from '../infrastructure/TaskRepository';
import { Task } from '../domain/Task';

export class TaskUseCases {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks(): Promise<ITask[]> {
    return this.taskRepository.getAllTasks();
  }

  async getTasksByStatus(status: TaskStatus): Promise<ITask[]> {
    return this.taskRepository.getTasksByStatus(status);
  }

  async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return this.taskRepository.createTask(task);
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<ITask> {
    return this.taskRepository.updateTaskStatus(taskId, status);
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
} 