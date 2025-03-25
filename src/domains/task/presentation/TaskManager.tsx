'use client';

import { useState } from 'react';
import { Container } from '@/presentation/design-system/ui/atoms/layouts/Container';
import { TaskBoard } from '@/domains/task/presentation/TaskBoard';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import { TaskFormModal } from './TaskFormModal';
import { TaskNode } from '@/domains/task/domain/TaskTypes';
import { useTask } from '@/domains/task/application/useTask';
import { useAuth } from '@/domains/auth/domain/useAuth';

export function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskNode | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const { createNewTask, tasks } = useTask();
  const { user } = useAuth();
  console.log('tasks', tasks());

  const handleOpenCreateModal = () => {
    setSelectedTask(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: TaskNode) => {
    setSelectedTask(task);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(undefined);
  };

  const handleSubmit = (data: any) => {
    console.log('data', data);
    if (!user) return;

    if (modalMode === 'create') {
      createNewTask({
        title: data.title,
        description: data.description,
        status: data.status,
        isFavorite: data.isFavorite,
      });
    } 
    // else if (selectedTask) {
    //   updateExistingTask({
    //     id: selectedTask.id,
    //     title: data.title,
    //     description: data.description,
    //     status: data.status,
    //     isFavorite: data.isFavorite,
    //   });
    // }

    handleCloseModal();
  };

  return (
    <Container>
      <div className="flex justify-end mb-4" style={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={handleOpenCreateModal}>
          Add Task
        </Button>
      </div>
      <TaskBoard onEditTask={handleOpenEditModal} />
      <TaskFormModal 
        open={isModalOpen} 
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        task={selectedTask}
        mode={modalMode}
      />
    </Container>
  );
}
