import { Dispatch } from '@reduxjs/toolkit';
import { ITaskRepository } from '../domain/TaskRepository';
import { TaskNode, TaskStatus } from '../domain/TaskTypes';
import { createTask, updateTask, deleteTask, updateTaskStatus } from '../store/taskSlice';
import { generateTaskId } from '../application/utils/taskUtils';

export class ReduxTaskRepository implements ITaskRepository {
  constructor(private dispatch: Dispatch) {}

  getAllTasks(): TaskNode[] {
    // This will be handled by the Redux store selector
    return [];
  }

  getTasksByStatus(status: TaskStatus): TaskNode[] {
    // This will be handled by the Redux store selector
    return [];
  }

  async createTask(task: Partial<TaskNode>): Promise<TaskNode> {
    const newTask: TaskNode = {
      ...task,
      id: generateTaskId(task.userId!),
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TaskNode;

    this.dispatch(createTask(newTask));
    return newTask;
  }

  async updateTask(taskId: string, updates: Partial<TaskNode>): Promise<TaskNode> {
    this.dispatch(updateTask({ id: taskId, ...updates }));
    return {} as TaskNode; // This will be handled by the Redux store selector
  }

  deleteTask(taskId: string): void {
    this.dispatch(deleteTask(taskId));
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<TaskNode> {
    this.dispatch(updateTaskStatus({ taskId, status }));
    return {} as TaskNode; // This will be handled by the Redux store selector
  }
} 