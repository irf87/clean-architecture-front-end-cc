export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
} 