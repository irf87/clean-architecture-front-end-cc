'use client';

import { useState } from 'react';

import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';

interface UseTaskDragAndDropProps {
  onStatusChange: (taskId: string, status: TaskStatus) => Promise<void>;
}

export const useTaskDragAndDrop = ({ onStatusChange }: UseTaskDragAndDropProps) => {
  const [draggedTask, setDraggedTask] = useState<TaskNode | null>(null);

  const handleDragStart = (task: TaskNode) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: TaskStatus) => {
    if (draggedTask && draggedTask.status !== status) {
      await onStatusChange(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  return {
    draggedTask,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}; 