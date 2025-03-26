import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TaskUseCase } from '@/domains/task/application/TaskUseCase';
import { ReduxTaskRepositoryImpl } from '@/domains/task/infrastructure/ReduxTaskRepositoryImpl';
import { CreateTaskDTO, GroupedTasks, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { useAuth } from '@/domains/auth/domain/useAuth';
import { selectUserTasks } from '@/domains/task/store/taskSlice';

export const useTask = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const taskRepository = new ReduxTaskRepositoryImpl(dispatch);
  const taskManagerUseCase = new TaskUseCase(taskRepository);
  
  const reduxTasks = useSelector((state: RootState) => selectUserTasks(state, user?.email || ''));
  const { isLoading, error } = useSelector((state: RootState) => state.tasks);

  const tasks: GroupedTasks = {
    pending: reduxTasks.filter(task => task.status === 'pending'),
    in_progress: reduxTasks.filter(task => task.status === 'in_progress'),
    done: reduxTasks.filter(task => task.status === 'done')
  };

  const createNewTask = async (taskData: CreateTaskDTO) => {
    return taskManagerUseCase.create(taskData, user?.email || '');
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    return taskManagerUseCase.updateTaskStatus(taskId, status, user?.email || '');
  };

  return {
    tasks,
    isLoading,
    error,
    createNewTask,
    updateTaskStatus,
  };
}; 