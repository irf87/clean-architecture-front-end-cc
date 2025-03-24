import { TaskCard } from '@/presentation/design-system/ui/molecules/cards/TaskCard';
import { TaskStatus } from '@/domains/task/domain/TaskTypes';

interface TaskColumnProps {
  status: TaskStatus;
}

export function TaskColumn({ status }: TaskColumnProps) {
  return (
    <div className="space-y-4">
      {/* TODO: Replace with actual tasks */}
      <TaskCard
        task={{
          id: '1',
          title: 'Example Task',
          description: 'This is an example task',
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
          isFavorite: false,
        }}
      />
    </div>
  );
} 