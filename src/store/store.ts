import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../domains/auth/store/authSlice';
import { taskReducer } from '../domains/task/store/taskSlice';

import { authMiddleware, taskMiddleware } from './middleware';

const TASKS_STORAGE_KEY = 'tasks';

// Load tasks from localStorage
const loadTasksFromStorage = () => {
  if (typeof window !== 'undefined') {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      try {
        return JSON.parse(tasksJson);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return {};
      }
    }
  }
  return {};
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  preloadedState: {
    tasks: {
      tasks: loadTasksFromStorage(),
      isLoading: false,
      error: null,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, taskMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 