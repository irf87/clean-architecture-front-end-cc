import { TaskCard } from '@/domains/task/presentation/TaskCard';
import { TaskNode } from '@/domains/task/domain/TaskTypes';

interface TaskColumnProps {
  tasks: TaskNode[];
  onDragStart: (task: TaskNode) => void;
  onEdit: (task: TaskNode) => void;
  onDelete: (taskId: TaskNode) => void;
  onToggleFavorite: (taskId: string) => void;
}

export function TaskColumn({ tasks, onEdit, onDelete, onToggleFavorite, onDragStart }: TaskColumnProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
} 