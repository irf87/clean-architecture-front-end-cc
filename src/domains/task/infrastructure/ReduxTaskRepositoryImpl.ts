import { Dispatch, Store } from '@reduxjs/toolkit';

import { ITaskRepository } from '@/domains/task//domain/TaskRepository';
import { generateTaskId } from '@/domains/task/application/utils/taskUtils';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { createTask, updateTask, deleteTask, updateTaskStatus, toggleFavorite, selectUserTasks, setError } from '@/domains/task/store/taskSlice';
import { RootState } from '@/store/store';

export class ReduxTaskRepositoryImpl implements ITaskRepository {
  constructor(
    private dispatch: Dispatch,
    private store: Store<RootState>
  ) {}

  getAllTasks(userEmail: string): TaskNode[] {
    return selectUserTasks(this.store.getState(), userEmail);
  }

  async createTask(task: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {

    const newTask: TaskNode = {
      ...task,
      id: generateTaskId(userEmail),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: task.parentId || '',
    } as TaskNode;

    this.dispatch(createTask({ task: newTask, userEmail }));
    return newTask;
  }

  async updateTask(taskId: string, updates: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {

    this.dispatch(updateTask({ task: { id: taskId, updatedAt: new Date().toISOString(), ...updates }, userEmail }));
    return {} as TaskNode; 
  }

  deleteTask(taskId: string, userEmail: string): void {
    this.dispatch(deleteTask({ taskId, userEmail }));
  }

  async updateTaskStatus(taskId: string, status: TaskStatus, userEmail: string): Promise<TaskNode> {
    this.dispatch(updateTaskStatus({ taskId, status, userEmail }));
    return {} as TaskNode;
  }

  async toggleFavorite(taskId: string, userEmail: string): Promise<TaskNode> {
    this.dispatch(toggleFavorite({ taskId, userEmail }));
    return {} as TaskNode;
  }

  setError(error: string): void {
    this.dispatch(setError(error));
  }
} 