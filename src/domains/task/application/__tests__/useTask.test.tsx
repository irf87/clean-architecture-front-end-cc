/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-duplicates, import/order */
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useTask } from '@/domains/task/application/useTask';
import { TASK_ERRORS } from '@/domains/task/domain/TaskConstants';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { taskReducer, createTask, updateTask, deleteTask, toggleFavorite, setError } from '@/domains/task/store/taskSlice';
import { authReducer } from '@/domains/auth/store/authSlice';
import { ReduxTaskRepositoryImpl } from '@/domains/task/infrastructure/ReduxTaskRepositoryImpl';

// Mock dependencies
vi.mock('@/domains/auth/domain/useAuth', () => ({
  useAuth: () => ({
    user: {
      email: 'test@example.com',
    },
  }),
}));

// Mock the repository module
vi.mock('@/domains/task/infrastructure/ReduxTaskRepositoryImpl');

describe('useTask', () => {
  const mockTask: TaskNode = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending' as TaskStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: '',
    isFavorite: false,
  };

  let store: ReturnType<typeof configureStore>;
  let mockRepository: any;

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        tasks: taskReducer,
        auth: authReducer,
      },
    });

    mockRepository = {
      getAllTasks: vi.fn().mockReturnValue([]),
      createTask: vi.fn().mockImplementation((task: Partial<TaskNode>, userEmail: string) => {
        const newTask = {
          ...task,
          id: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          parentId: task.parentId || '',
          isFavorite: task.isFavorite || false,
        } as TaskNode;
        store.dispatch(createTask({ task: newTask, userEmail }));
        return newTask;
      }),
      updateTask: vi.fn().mockImplementation((taskId: string, updates: Partial<TaskNode>, userEmail: string) => {
        const updatedTask = {
          ...updates,
          id: taskId,
          updatedAt: new Date().toISOString(),
        } as TaskNode;
        store.dispatch(updateTask({ task: updatedTask, userEmail }));
        return updatedTask;
      }),
      deleteTask: vi.fn().mockImplementation((taskId: string, userEmail: string) => {
        store.dispatch(deleteTask({ taskId, userEmail }));
      }),
      toggleFavorite: vi.fn().mockImplementation((taskId: string, userEmail: string) => {
        store.dispatch(toggleFavorite({ taskId, userEmail }));
        return {
          id: taskId,
          isFavorite: true,
          updatedAt: new Date().toISOString(),
        };
      }),
      setError: vi.fn().mockImplementation((error: string) => {
        store.dispatch(setError(error));
      }),
    };

    vi.mocked(ReduxTaskRepositoryImpl).mockImplementation(() => mockRepository);
  });

  describe('createNewTask', () => {
    it('should create a new task when title is not duplicate', async () => {
      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      const newTask = {
        title: 'New Task',
        description: 'New Description',
        status: 'pending' as TaskStatus,
      };

      await act(async () => {
        await result.current.createNewTask(newTask);
      });

      const tasks = result.current.tasks;
      expect(tasks.pending).toHaveLength(1);
      expect(tasks.pending[0].title).toBe(newTask.title);
      expect(tasks.pending[0].description).toBe(newTask.description);
    });

    it('should not create a task when title is duplicate', async () => {
      mockRepository.getAllTasks.mockReturnValue([{
        ...mockTask,
        title: 'Duplicate Task',
      }]);

      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      // Try to create a task with the same title
      await act(async () => {
        await result.current.createNewTask({
          title: 'Duplicate Task',
          description: 'Second Description',
          status: 'pending' as TaskStatus,
        });
      });

      expect(mockRepository.setError).toHaveBeenCalledWith(TASK_ERRORS.DUPLICATE_TITLE);
      expect(mockRepository.createTask).not.toHaveBeenCalled();
    });
  });

  describe('updateExistingTask', () => {
    it('should update a task when new title is not duplicate', async () => {
      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      // First create a task
      await act(async () => {
        await result.current.createNewTask({
          title: 'Original Task',
          description: 'Original Description',
          status: 'pending' as TaskStatus,
        });
      });

      const taskId = result.current.tasks.pending[0].id;

      await act(async () => {
        await result.current.updateExistingTask(taskId, {
          title: 'Updated Task',
          description: 'Updated Description',
        });
      });

      const tasks = result.current.tasks;
      expect(tasks.pending[0].title).toBe('Updated Task');
      expect(tasks.pending[0].description).toBe('Updated Description');
    });

    it('should not update a task when new title is duplicate', async () => {
      mockRepository.getAllTasks.mockReturnValue([
        { ...mockTask, id: '1', title: 'First Task' },
        { ...mockTask, id: '2', title: 'Second Task' },
      ]);

      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      await act(async () => {
        await result.current.createNewTask({
          title: 'First Task',
          description: 'First Description',
          status: 'pending' as TaskStatus,
        });
      });

      await act(async () => {
        await result.current.createNewTask({
          title: 'Second Task',
          description: 'Second Description',
          status: 'pending' as TaskStatus,
        });
      });

      await act(async () => {
        await result.current.updateExistingTask('1', {
          title: 'Second Task',
        });
      });

      expect(mockRepository.setError).toHaveBeenCalledWith(TASK_ERRORS.DUPLICATE_TITLE);
      expect(mockRepository.updateTask).not.toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('should remove task from store', async () => {
      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      await act(async () => {
        await result.current.createNewTask({
          title: 'Task to Delete',
          description: 'Description',
          status: 'pending' as TaskStatus,
        });
      });

      const taskId = result.current.tasks.pending[0].id;

      await act(async () => {
        await result.current.deleteTask(taskId);
      });

      const tasks = result.current.tasks;
      expect(tasks.pending).toHaveLength(0);
    });
  });

  describe('toggleFavorite', () => {
    it('should toggle isFavorite property from false to true', async () => {
      const { result } = renderHook(() => useTask(), { wrapper: Wrapper });

      // Create a task with isFavorite = false
      await act(async () => {
        await result.current.createNewTask({
          title: 'Favorite Task',
          description: 'Description',
          status: 'pending' as TaskStatus,
          isFavorite: false,
        });
      });

      const taskId = result.current.tasks.pending[0].id;

      await act(async () => {
        await result.current.toggleFavorite(taskId);
      });

      const tasks = result.current.tasks;
      expect(tasks.pending[0].isFavorite).toBe(true);
    });
  });
}); 