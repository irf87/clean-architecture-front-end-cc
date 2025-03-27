export type TaskStatus = 'pending' | 'in_progress' | 'done';
export type GroupedTasks = {
  [K in TaskStatus]: TaskNode[];
};

export interface TaskNode {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  parentId: string;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  status: TaskStatus; 
  parentId?: string;
  isFavorite?: boolean;
}

export interface UpdateTaskDTO {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  isFavorite?: boolean;
}

export interface UserTasks {
  [email: string]: TaskNode[];
}

export interface TaskState {
  tasks: UserTasks;
  isLoading: boolean;
  error: string | null;
} 