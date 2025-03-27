import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskUseCase } from '@/domains/task/application/TaskUseCase';
import { ReduxTaskRepositoryImpl } from '@/domains/task/infrastructure/ReduxTaskRepositoryImpl';
import { CreateTaskDTO, GroupedTasks, TaskStatus, TaskNode } from '@/domains/task/domain/TaskTypes';
import { useAuth } from '@/domains/auth/domain/useAuth';
import { selectUserTasks } from '@/domains/task/store/taskSlice';
import { createSelector } from '@reduxjs/toolkit';

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
  const taskRepository = new ReduxTaskRepositoryImpl(dispatch);
  const taskManagerUseCase = new TaskUseCase(taskRepository);
  
  const tasks = useSelector((state: RootState) => selectGroupedTasks(state, user?.email || ''));
  const { isLoading, error } = useSelector(selectTaskState);

  const createNewTask = async (taskData: CreateTaskDTO) => {
    return taskManagerUseCase.create(taskData, user?.email || '');
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    return taskManagerUseCase.updateTaskStatus(taskId, status, user?.email || '');
  };

  const updateExistingTask = async (taskId: string, updates: Partial<TaskNode>) => {
    return taskManagerUseCase.update(taskId, updates, user?.email || '');
  };

  const deleteTask = async (taskId: string) => {
    return taskManagerUseCase.delete(taskId, user?.email || '');
  };

  const toggleFavorite = async (taskId: string) => {
    return taskManagerUseCase.toggleFavorite(taskId, user?.email || '');
  };

  return {
    tasks,
    isLoading,
    error,
    createNewTask,
    updateTaskStatus,
    updateExistingTask,
    deleteTask,
    toggleFavorite,
  };
}; 