'use client';

import { TaskColumn } from './TaskColumn';
import { useTaskDragAndDrop } from '@/domains/task/application/useTaskDragAndDrop';
import { TaskStatus, TaskNode, GroupedTasks } from '@/domains/task/domain/TaskTypes';
import { useTask } from '@/domains/task/application/useTask';
import { useAuth } from '@/domains/auth/domain/useAuth';

interface TaskBoardProps {
  onEditTask: (task: TaskNode) => void;
  onDeleteTask: (taskId: string) => void;
  groupedTasks: GroupedTasks;
}

export function TaskBoard({ onEditTask, onDeleteTask, groupedTasks }: TaskBoardProps) {
  const { user } = useAuth();
  const { updateTaskStatus } = useTask();
  const columns: TaskStatus[] = ['pending', 'in_progress', 'done'];
  
  const { handleDragStart, handleDragOver, handleDrop } = useTaskDragAndDrop({
    onStatusChange: async (taskId, status) => {
      await updateTaskStatus(taskId, status);
    },
  });

  if (!user) return null;

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
          <TaskColumn 
            tasks={groupedTasks[status]}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={handleDragStart}
          />
        </div>
      ))}
    </div>
  );
} 