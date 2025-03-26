import { ITaskRepository } from '@/domains/task/domain/TaskRepository';
import { CreateTaskDTO, TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';

export class TaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async create(taskData: CreateTaskDTO, userEmail: string): Promise<TaskNode> {
    return this.taskRepository.createTask(taskData, userEmail);
  }

  getAllTasks(userEmail: string) {
    return this.taskRepository.getAllTasks(userEmail);
  }

  async updateTaskStatus(taskId: string, status: TaskStatus, userEmail: string): Promise<TaskNode> {
    return this.taskRepository.updateTaskStatus(taskId, status, userEmail);
  }
} 