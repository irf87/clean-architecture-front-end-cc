'use client';

import { TaskNode } from '@/domains/task/domain/TaskTypes';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import styled from 'styled-components';

interface TaskCardProps {
  task: TaskNode;
  onDelete?: (taskId: string) => void;
  onEdit?: (task: TaskNode) => void;
  draggable?: boolean;
  onDragStart?: (task: TaskNode) => void;
}

const Card = styled.div<{ draggable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
  border-radius: 3px;
  padding: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  transition: all 200ms ease-in-out;
  cursor: ${({ draggable }) => draggable ? 'move' : 'default'};

  &:hover {
    box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25);
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const DateInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.disabled};
  font-size: 0.75rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  padding-top: 0.75rem;
`;

export function TaskCard({ 
  task, 
  onDelete, 
  onEdit, 
  draggable = true,
  onDragStart 
}: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (draggable && onDragStart) {
      onDragStart(task);
    }
  };

  const isModified = task.createdAt.getTime() !== task.updatedAt.getTime();

  return (
    <Card
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <Title>{task.title}</Title>
      <Description>{task.description}</Description>
      <DateInfo>
        {isModified ? 'Modified' : 'Created'}: {isModified ? task.updatedAt.toLocaleDateString() : task.createdAt.toLocaleDateString()}
      </DateInfo>
      <ButtonContainer>
        <Button
          variant="secondary"
          size="small"
          onClick={() => onEdit?.(task)}
        >
          Edit
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => onDelete?.(task.id)}
        >
          Remove
        </Button>
      </ButtonContainer>
    </Card>
  );
} 