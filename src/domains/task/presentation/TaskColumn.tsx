import { TaskCard } from '@/presentation/design-system/ui/molecules/cards/TaskCard';
import { TaskNode } from '@/domains/task/domain/TaskTypes';

interface TaskColumnProps {
  tasks: TaskNode[];
  onDragStart: (task: TaskNode) => void;
  onEdit: (task: TaskNode) => void;
}

export function TaskColumn({ tasks, onEdit, onDragStart }: TaskColumnProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
} 