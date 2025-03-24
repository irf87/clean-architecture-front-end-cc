import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CreateTaskUseCase } from '@/domains/task/application/CreateTaskUseCase';
import { ReduxTaskRepository } from '@/domains/task/infrastructure/ReduxTaskRepository';
import { CreateTaskDTO, TaskNode } from '@/domains/task/domain/TaskTypes';
import { getTasksByUserId } from '@/domains/task/application/utils/taskUtils';

export const useTask = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks);

  // Initialize repository and use case
  const taskRepository = new ReduxTaskRepository(dispatch);
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);

  const createNewTask = async (taskData: CreateTaskDTO) => {
    return createTaskUseCase.execute(taskData);
  };

  const getUserTasks = (userId: string): TaskNode[] => {
    return getTasksByUserId(tasks, userId);
  };

  return {
    tasks,
    isLoading,
    error,
    createNewTask,
    getUserTasks,
  };
}; 