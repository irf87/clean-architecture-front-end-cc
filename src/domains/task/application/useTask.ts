import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '@/domains/auth/domain/useAuth';
import { TaskUseCase } from '@/domains/task/application/TaskUseCase';
import { TASK_ERRORS } from '@/domains/task/domain/TaskConstants';
import { CreateTaskDTO, TaskStatus, TaskNode } from '@/domains/task/domain/TaskTypes';
import { ReduxTaskRepositoryImpl } from '@/domains/task/infrastructure/ReduxTaskRepositoryImpl';
import { selectUserTasks } from '@/domains/task/store/taskSlice';
import { RootState, store } from '@/store/store';

const selectGroupedTasks = createSelector(
  [selectUserTasks],
  (tasks) => ({
    pending: tasks.filter(task => task.status === 'pending'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    done: tasks.filter(task => task.status === 'done')
  })
);

const selectTaskState = createSelector(
  [(state: RootState) => state.tasks],
  (tasksState) => ({
    isLoading: tasksState.isLoading,
    error: tasksState.error
  })
);

export const useTask = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const taskRepository = new ReduxTaskRepositoryImpl(dispatch, store);
  const taskManagerUseCase = new TaskUseCase(taskRepository);
  
  const tasks = useSelector((state: RootState) => selectGroupedTasks(state, user?.email || ''));
  const { isLoading, error } = useSelector(selectTaskState);

  const createNewTask = async (taskData: CreateTaskDTO) => {
    if (!validateDuplicateTitle(taskData.title)) {
      taskRepository.setError(TASK_ERRORS.DUPLICATE_TITLE);
      return;
    }
    return taskManagerUseCase.create(taskData, user?.email || '');
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    return taskManagerUseCase.updateTaskStatus(taskId, status, user?.email || '');
  };

  const updateExistingTask = async (taskId: string, updates: Partial<TaskNode>) => {
    if(updates?.title) {
      if (!validateDuplicateTitle(updates?.title)) {
        taskRepository.setError(TASK_ERRORS.DUPLICATE_TITLE);
        return;
      }
    }
    return taskManagerUseCase.update(taskId, updates, user?.email || '');
  };

  const deleteTask = async (taskId: string) => {
    return taskManagerUseCase.delete(taskId, user?.email || '');
  };

  const toggleFavorite = async (taskId: string) => {
    return taskManagerUseCase.toggleFavorite(taskId, user?.email || '');
  };

  const validateDuplicateTitle = (title: string) => {
    const tasks = taskManagerUseCase.getAllTasks(user?.email || '');
    return !tasks.some(task => task.title.toLowerCase() === title.toLowerCase());
  };

  const cleanError = () => {
    taskRepository.setError('');
  };

  return {
    tasks,
    isLoading,
    error: error || '',
    createNewTask,
    updateTaskStatus,
    updateExistingTask,
    deleteTask,
    toggleFavorite,
    cleanError,
  };
}; 