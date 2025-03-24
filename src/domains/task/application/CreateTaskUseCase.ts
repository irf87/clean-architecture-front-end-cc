import { ITaskRepository } from '../domain/TaskRepository';
import { CreateTaskDTO, TaskNode } from '../domain/TaskTypes';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskData: CreateTaskDTO): Promise<TaskNode> {
    return this.taskRepository.createTask(taskData);
  }
} 