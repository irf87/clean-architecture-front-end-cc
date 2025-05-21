'use client';

import { TaskNode } from '@/domains/task/domain/TaskTypes';
import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import Card from '@/presentation/design-system/ui/atoms/cards/Card';

interface TaskCardProps {
  task: TaskNode;
  onDelete?: (task: TaskNode) => void;
  onEdit?: (task: TaskNode) => void;
  onToggleFavorite?: (taskId: string) => void;
  draggable?: boolean;
  onDragStart?: (task: TaskNode) => void;
}

export function TaskCard({ 
  task, 
  onDelete, 
  onEdit,
  onToggleFavorite,
  draggable = true,
  onDragStart 
}: TaskCardProps) {
  const handleDragStart = () => {
    if (draggable && onDragStart) {
      onDragStart(task);
    }
  };
  const isModified = task.createdAt !== task.updatedAt;

  return (
    <Card
      draggable={draggable}
      onDragStart={handleDragStart}
      data-testid={`task-card-${task.id}`}
    >
      <Card.Header>
        <Card.Title data-testid={`task-title-${task.id}`}>{task.title}</Card.Title>
        <Card.FavoriteButton
          $isFavorite={task.isFavorite}
          onClick={() => onToggleFavorite?.(task.id)}
          aria-label={task.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          data-testid={`task-favorite-${task.id}`}
        >
          {task.isFavorite ? '★' : '☆'}
        </Card.FavoriteButton>
      </Card.Header>
      <Card.Description>{task.description}</Card.Description>
      <Card.DateInfo>
        {isModified ? 'Modified' : 'Created'}: {isModified ? new Date(task.updatedAt).toLocaleDateString() : new Date(task.createdAt).toLocaleDateString()}
      </Card.DateInfo>
      <Card.ButtonContainer>
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
          onClick={() => onDelete?.(task)}
        >
          Remove
        </Button>
      </Card.ButtonContainer>
    </Card>
  );
} 