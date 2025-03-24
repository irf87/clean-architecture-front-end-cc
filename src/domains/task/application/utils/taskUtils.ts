import { createHash } from 'crypto';

export const generateTaskId = (userId: string): string => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const dataToHash = `${userId}-${timestamp}-${randomString}`;
  
  const hash = createHash('sha256')
    .update(dataToHash)
    .digest('hex')
    .substring(0, 8);

  return `task-${timestamp}-${hash}`;
};

export const findTaskById = (tasks: any[], taskId: string): any | null => {
  for (const task of tasks) {
    if (task.id === taskId) {
      return task;
    }
    const found = findTaskById(task.children, taskId);
    if (found) {
      return found;
    }
  }
  return null;
};

export const getTasksByUserId = (tasks: any[], userId: string): any[] => {
  return tasks.filter(task => task.userId === userId);
}; 