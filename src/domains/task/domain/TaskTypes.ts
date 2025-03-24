export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface TaskNode {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
} 