import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskUseCase } from '@/domains/task/application/TaskUseCase';
import { ReduxTaskRepositoryImpl } from '@/domains/task/infrastructure/ReduxTaskRepositoryImpl';
import { CreateTaskDTO, TaskNode } from '@/domains/task/domain/TaskTypes';
import { useAuth } from '@/domains/auth/domain/useAuth';

export const useTask = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const taskRepository = new ReduxTaskRepositoryImpl(dispatch);
  const taskManagerUseCase = new TaskUseCase(taskRepository);
 
  const { isLoading, error } = useSelector((state: RootState) => state.tasks);

  // Initialize repository and use case
  

  const createNewTask = async (taskData: CreateTaskDTO) => {
    return taskManagerUseCase.create(taskData, user?.email || '');
  };

  const getUserTasks = (): TaskNode[] => {
    return taskManagerUseCase.getAllTasks(user?.email || '');
  };

  return {
    tasks: getUserTasks,
    isLoading,
    error,
    createNewTask,
  };
}; 