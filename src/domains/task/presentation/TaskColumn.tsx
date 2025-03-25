import { TaskCard } from '@/presentation/design-system/ui/molecules/cards/TaskCard';
import { TaskStatus, TaskNode } from '@/domains/task/domain/TaskTypes';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: TaskNode[];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
} 