'use client';

import { useState } from 'react';

import { useTask } from '@/domains/task/application/useTask';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { TaskBoard } from '@/domains/task/presentation/TaskBoard';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import { Container } from '@/presentation/design-system/ui/atoms/layouts/Container';

import { DeleteTaskConfirmationModal } from './DeleteTaskConfirmationModal';
import { TaskFormModal } from './TaskFormModal';

interface TaskFormInputs {
  title: string;
  description: string;
  status: TaskStatus;
  isFavorite: boolean;
}

export function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskNode | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const { cleanError, createNewTask, tasks, updateExistingTask, deleteTask, toggleFavorite, error } = useTask();

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

  const handleOpenDeleteModal = (task: TaskNode) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(undefined);
    cleanError();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(undefined);
  };

  const handleSubmit = async (data: TaskFormInputs) => {
    let shouldCloseModal = true;
    if (modalMode === 'create') {
      shouldCloseModal = Boolean(await createNewTask({
        title: data.title,
        description: data.description,
        status: data.status,
        isFavorite: data.isFavorite,
      }));
    } else if (selectedTask) {
      shouldCloseModal = Boolean(await updateExistingTask(selectedTask.id, {
        title: data.title,
        description: data.description,
        status: data.status,
        isFavorite: data.isFavorite,
      }));
    }
    return shouldCloseModal;
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      handleCloseDeleteModal();
    }
  };

  const handleToggleFavorite = (taskId: string) => {
    toggleFavorite(taskId);
  };

  return (
    <Container>
      <div className="flex justify-end mb-4" style={{ justifyContent: 'flex-end' }}>
        <Button variant="primary" onClick={handleOpenCreateModal}>
          Add Task
        </Button>
      </div>
      <TaskBoard 
        groupedTasks={tasks} 
        onEditTask={handleOpenEditModal}
        onDeleteTask={handleOpenDeleteModal}
        onToggleFavorite={handleToggleFavorite}
      />
      <TaskFormModal
        error={error}
        open={isModalOpen} 
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        task={selectedTask}
        mode={modalMode}
      />
      {selectedTask && (
        <DeleteTaskConfirmationModal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          task={selectedTask}
        />
      )}
    </Container>
  );
}
