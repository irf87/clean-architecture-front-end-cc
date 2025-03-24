'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '@/presentation/design-system/ui/atoms/modal/Modal';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import { Input } from '@/presentation/design-system/ui/atoms/inputs/Input';
import { Select } from '@/presentation/design-system/ui/atoms/inputs/Select';
import { TaskStatus } from '@/domains/task/domain/TaskTypes';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  done: 'Hecho',
};

export function CreateTaskModal({ open, onClose }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState<TaskStatus>('pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create functionality will be implemented later
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create New Task">
      <Form onSubmit={handleSubmit}>
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          fullWidth
        />

        <Input
          label="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
          fullWidth
        />

        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          fullWidth
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            id="favorite"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          <label htmlFor="favorite">Mark as favorite</label>
        </CheckboxGroup>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Create Task
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
} 