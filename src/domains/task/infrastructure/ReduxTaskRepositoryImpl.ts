import { Dispatch } from '@reduxjs/toolkit';
import { ITaskRepository } from '../domain/TaskRepository';
import { TaskNode, TaskStatus } from '../domain/TaskTypes';
import { createTask, updateTask, deleteTask, updateTaskStatus, selectUserTasks } from '../store/taskSlice';
import { generateTaskId } from '../application/utils/taskUtils';
import { RootState } from '@/store/store';

export class ReduxTaskRepositoryImpl implements ITaskRepository {
  constructor(private dispatch: Dispatch) {}

  getAllTasks(userEmail: string): TaskNode[] {
    const state = (window as any).__NEXT_DATA__?.props?.pageProps?.store?.getState() as RootState;
    return selectUserTasks(state, userEmail);
  }

  getTasksByStatus(status: TaskStatus): TaskNode[] {
    // This will be handled by the Redux store selector
    return [];
  }

  async createTask(task: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {
    const newTask: TaskNode = {
      ...task,
      id: generateTaskId(userEmail),
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: task.parentId || '',
    } as TaskNode;

    this.dispatch(createTask({ task: newTask, userEmail }));
    return newTask;
  }

  async updateTask(taskId: string, updates: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {
    this.dispatch(updateTask({ task: { id: taskId, ...updates }, userEmail }));
    return {} as TaskNode; // This will be handled by the Redux store selector
  }

  deleteTask(taskId: string, userEmail: string): void {
    this.dispatch(deleteTask({ taskId, userEmail }));
  }

  async updateTaskStatus(taskId: string, status: TaskStatus, userEmail: string): Promise<TaskNode> {
    this.dispatch(updateTaskStatus({ taskId, status, userEmail }));
    return {} as TaskNode; // This will be handled by the Redux store selector
  }
} 