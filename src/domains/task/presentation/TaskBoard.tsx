'use client';

import { TaskColumn } from './TaskColumn';
import { useTaskDragAndDrop } from '@/domains/task/application/useTaskDragAndDrop';
import { TaskStatus, TaskNode } from '@/domains/task/domain/TaskTypes';
import { useTask } from '@/domains/task/application/useTask';
import { useAuth } from '@/domains/auth/domain/useAuth';

interface TaskBoardProps {
  onEditTask: (task: TaskNode) => void;
}

export function TaskBoard({ onEditTask }: TaskBoardProps) {
  const { tasks, getUserTasks, createNewTask } = useTask();
  const { user } = useAuth();
  const columns: TaskStatus[] = ['pending', 'in_progress', 'done'];
  
  const { handleDragOver, handleDrop } = useTaskDragAndDrop({
    onStatusChange: async (taskId, status) => {
      // TODO: Implement status change logic
      console.log('Status changed:', taskId, status);
    },
  });

  if (!user) return null;

  const userTasks = getUserTasks(user.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((status) => (
        <div
          key={status}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(status)}
          className="bg-gray-100 rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold mb-4 capitalize">
            {status.replace('_', ' ')}
          </h2>
          <TaskColumn status={status} />
        </div>
      ))}
    </div>
  );
} 