import { Dispatch } from '@reduxjs/toolkit';
import { ITaskRepository } from '@/domains/task//domain/TaskRepository';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { createTask, updateTask, deleteTask, updateTaskStatus, toggleFavorite, selectUserTasks } from '@/domains/task/store/taskSlice';
import { generateTaskId } from '@/domains/task/application/utils/taskUtils';
import { RootState } from '@/store/store';

export class ReduxTaskRepositoryImpl implements ITaskRepository {
  constructor(private dispatch: Dispatch) {}

  getAllTasks(userEmail: string): TaskNode[] {
    const state = (window as any).__NEXT_DATA__?.props?.pageProps?.store?.getState() as RootState;
    return selectUserTasks(state, userEmail);
  }

  async createTask(task: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {
    const newTask: TaskNode = {
      ...task,
      id: generateTaskId(userEmail),
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: task.parentId || '',
    } as TaskNode;

    this.dispatch(createTask({ task: newTask, userEmail }));
    return newTask;
  }

  async updateTask(taskId: string, updates: Partial<TaskNode>, userEmail: string): Promise<TaskNode> {
    this.dispatch(updateTask({ task: { id: taskId, ...updates }, userEmail }));
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
} 