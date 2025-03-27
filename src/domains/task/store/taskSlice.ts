import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { TaskNode, TaskState, UpdateTaskDTO, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { RootState } from '@/store/store';

const initialState: TaskState = {
  tasks: {},
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    createTask: (state, action: PayloadAction<{ task: TaskNode; userEmail: string }>) => {
      const { task, userEmail } = action.payload;

      if (!state.tasks[userEmail]) {
        state.tasks[userEmail] = [];
      }

      state.tasks[userEmail].push(task);
    },
    updateTask: (state, action: PayloadAction<{ task: UpdateTaskDTO; userEmail: string }>) => {
      const { task, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const taskIndex = state.tasks[userEmail].findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        state.tasks[userEmail][taskIndex] = {
          ...state.tasks[userEmail][taskIndex],
          ...task,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      state.tasks[userEmail] = state.tasks[userEmail].filter(task => task.id !== taskId);
    },
    toggleFavorite: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const taskIndex = state.tasks[userEmail].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[userEmail][taskIndex] = {
          ...state.tasks[userEmail][taskIndex],
          isFavorite: !state.tasks[userEmail][taskIndex].isFavorite,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskNode[]; userEmail: string }>) => {
      const { tasks, userEmail } = action.payload;
      state.tasks[userEmail] = tasks;
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus; userEmail: string }>) => {
      const { taskId, status, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const taskIndex = state.tasks[userEmail].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[userEmail][taskIndex] = {
          ...state.tasks[userEmail][taskIndex],
          status,
          updatedAt: new Date().toISOString(),
        };
      }
    },
  },
});

const selectTasksState = (state: RootState) => state.tasks.tasks;

export const selectUserTasks = createSelector(
  [selectTasksState, (state: RootState, userEmail: string) => userEmail],
  (tasks, userEmail) => tasks[userEmail] || []
);

export const {
  setLoading,
  setError,
  createTask,
  updateTask,
  deleteTask,
  toggleFavorite,
  setTasks,
  updateTaskStatus,
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer; 