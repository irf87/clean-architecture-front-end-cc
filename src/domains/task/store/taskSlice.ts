import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { TaskNode, TaskState, UpdateTaskDTO, TaskStatus } from '@/domains/task/domain/TaskTypes';

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

      state.tasks[userEmail] = state.tasks[userEmail].map(t => {
        if (t.id === task.id) {
          return {
            ...t,
            ...task,
          };
        }
        return t;
      });
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      state.tasks[userEmail] = state.tasks[userEmail].filter(task => task.id !== taskId);
    },
    toggleFavorite: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      state.tasks[userEmail] = state.tasks[userEmail].map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            isFavorite: !task.isFavorite,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      });
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskNode[]; userEmail: string }>) => {
      const { tasks, userEmail } = action.payload;
      state.tasks[userEmail] = tasks;
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus; userEmail: string }>) => {
      const { taskId, status, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      state.tasks[userEmail] = state.tasks[userEmail].map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      });
    },
  },
});

// Selectors
export const selectUserTasks = (state: RootState, userEmail: string) => 
  state?.tasks?.tasks[userEmail] || [];

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