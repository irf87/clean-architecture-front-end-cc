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
      const newTask: TaskNode = {
        ...task,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        parentId: task.parentId || '',
      };

      if (!state.tasks[userEmail]) {
        state.tasks[userEmail] = [];
      }

      if (task.parentId) {
        const addToParent = (tasks: TaskNode[]): TaskNode[] => {
          return tasks.map(task => {
            if (task.id === task.parentId) {
              return {
                ...task,
                children: [...task.children, newTask],
              };
            }
            return {
              ...task,
              children: addToParent(task.children),
            };
          });
        };
        state.tasks[userEmail] = addToParent(state.tasks[userEmail]);
      } else {
        state.tasks[userEmail].push(newTask);
      }
    },
    updateTask: (state, action: PayloadAction<{ task: UpdateTaskDTO; userEmail: string }>) => {
      const { task, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const updateTaskInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(t => {
          if (t.id === task.id) {
            return {
              ...t,
              ...task,
              updatedAt: new Date(),
            };
          }
          return {
            ...t,
            children: updateTaskInTree(t.children),
          };
        });
      };
      state.tasks[userEmail] = updateTaskInTree(state.tasks[userEmail]);
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const deleteTaskFromTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.filter(task => {
          if (task.id === taskId) {
            return false;
          }
          task.children = deleteTaskFromTree(task.children);
          return true;
        });
      };
      state.tasks[userEmail] = deleteTaskFromTree(state.tasks[userEmail]);
    },
    toggleFavorite: (state, action: PayloadAction<{ taskId: string; userEmail: string }>) => {
      const { taskId, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const toggleFavoriteInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              isFavorite: !task.isFavorite,
              updatedAt: new Date(),
            };
          }
          return {
            ...task,
            children: toggleFavoriteInTree(task.children),
          };
        });
      };
      state.tasks[userEmail] = toggleFavoriteInTree(state.tasks[userEmail]);
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskNode[]; userEmail: string }>) => {
      const { tasks, userEmail } = action.payload;
      state.tasks[userEmail] = tasks;
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus; userEmail: string }>) => {
      const { taskId, status, userEmail } = action.payload;
      if (!state.tasks[userEmail]) return;

      const updateStatusInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              status,
              updatedAt: new Date(),
            };
          }
          return {
            ...task,
            children: updateStatusInTree(task.children),
          };
        });
      };
      state.tasks[userEmail] = updateStatusInTree(state.tasks[userEmail]);
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