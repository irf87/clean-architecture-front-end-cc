import { Middleware } from '@reduxjs/toolkit';

import { setUser } from '@/domains/auth/store/authSlice';
import { encryptData } from '@/utils/encryption';
import { createTask, updateTask, deleteTask, toggleFavorite, updateTaskStatus } from '@/domains/task/store/taskSlice';

const TASKS_STORAGE_KEY = 'tasks';

export const authMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (action && typeof action === 'object' && 'type' in action && action.type === setUser.type) {
    const setUserAction = action as ReturnType<typeof setUser>;
    if (setUserAction.payload) {
      localStorage.setItem('user', JSON.stringify({
        ...setUserAction.payload,
        token: encryptData(setUserAction.payload.token || '')
      }));
    } else {
      localStorage.removeItem('user');
    }
  }

  return result;
};

export const taskMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save tasks to localStorage after any task-related action
  if (action && typeof action === 'object' && 'type' in action) {
    const actionType = action.type;
    if (
      actionType === createTask.type ||
      actionType === updateTask.type ||
      actionType === deleteTask.type ||
      actionType === toggleFavorite.type ||
      actionType === updateTaskStatus.type
    ) {
      const state = store.getState();
      if (state?.tasks?.tasks) {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks.tasks));
      }
    }
  }

  return result;
}; 