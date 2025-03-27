'use client';

import { styled } from 'styled-components';

import { TaskNode } from '@/domains/task/domain/TaskTypes';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import { Modal } from '@/presentation/design-system/ui/atoms/modal/Modal';

interface DeleteTaskConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: TaskNode;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export function DeleteTaskConfirmationModal({ 
  open, 
  onClose, 
  onConfirm,
  task 
}: DeleteTaskConfirmationModalProps) {
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Delete Task"
    >
      <Content>
        <Message>
          Are you sure you want to delete the task &ldquo;{task.title}&rdquo;? This action cannot be undone.
        </Message>
        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={onConfirm}>
            Delete
          </Button>
        </ButtonGroup>
      </Content>
    </Modal>
  );
} 