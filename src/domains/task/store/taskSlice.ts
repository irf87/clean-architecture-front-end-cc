import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskNode, TaskState, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { generateTaskId } from '../application/utils/taskUtils';

const initialState: TaskState = {
  tasks: [],
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
    createTask: (state, action: PayloadAction<CreateTaskDTO>) => {
      const newTask: TaskNode = {
        ...action.payload,
        id: generateTaskId(action.payload.userId),
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        children: [],
        parentId: action.payload.parentId || null,
      };

      if (action.payload.parentId) {
        // Add to parent's children
        const addToParent = (tasks: TaskNode[]): TaskNode[] => {
          return tasks.map(task => {
            if (task.id === action.payload.parentId) {
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
        state.tasks = addToParent(state.tasks);
      } else {
        // Add as root task
        state.tasks.push(newTask);
      }
    },
    updateTask: (state, action: PayloadAction<UpdateTaskDTO>) => {
      const updateTaskInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(task => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              ...action.payload,
              updatedAt: new Date(),
            };
          }
          return {
            ...task,
            children: updateTaskInTree(task.children),
          };
        });
      };
      state.tasks = updateTaskInTree(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const deleteTaskFromTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.filter(task => {
          if (task.id === action.payload) {
            return false;
          }
          task.children = deleteTaskFromTree(task.children);
          return true;
        });
      };
      state.tasks = deleteTaskFromTree(state.tasks);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const toggleFavoriteInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(task => {
          if (task.id === action.payload) {
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
      state.tasks = toggleFavoriteInTree(state.tasks);
    },
    setTasks: (state, action: PayloadAction<TaskNode[]>) => {
      state.tasks = action.payload;
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus }>) => {
      const updateStatusInTree = (tasks: TaskNode[]): TaskNode[] => {
        return tasks.map(task => {
          if (task.id === action.payload.taskId) {
            return {
              ...task,
              status: action.payload.status,
              updatedAt: new Date(),
            };
          }
          return {
            ...task,
            children: updateStatusInTree(task.children),
          };
        });
      };
      state.tasks = updateStatusInTree(state.tasks);
    },
  },
});

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