/* eslint-disable import/order */
import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TaskBoard } from '../TaskBoard';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { useTask } from '@/domains/task/application/useTask';
import { useTaskDragAndDrop } from '@/domains/task/application/useTaskDragAndDrop';
import { render } from '@/test/test-utils';

// Mock the hooks
vi.mock('@/domains/task/application/useTask');
vi.mock('@/domains/task/application/useTaskDragAndDrop');

describe('TaskBoard', () => {
  const mockUpdateTaskStatus = vi.fn();
  const mockHandleDragStart = vi.fn();
  const mockHandleDragOver = vi.fn();
  const mockHandleDrop = vi.fn();

  const mockTask: TaskNode = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending' as TaskStatus,
    isFavorite: false,
    createdAt: '2024-03-28T00:00:00Z',
    updatedAt: '2024-03-28T00:00:00Z',
    parentId: '',
  };

  const mockGroupedTasks = {
    pending: [mockTask],
    in_progress: [],
    done: [],
  };

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock useTask hook
    (useTask as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      updateTaskStatus: mockUpdateTaskStatus,
    });

    // Mock useTaskDragAndDrop hook
    (useTaskDragAndDrop as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleDragStart: mockHandleDragStart,
      handleDragOver: mockHandleDragOver,
      handleDrop: mockHandleDrop,
    });
  });

  it('should render all columns', () => {
    render(
      <TaskBoard
        groupedTasks={mockGroupedTasks}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('in progress')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
  });

  it('should call handleDragStart when dragging a task', () => {
    render(
      <TaskBoard
        groupedTasks={mockGroupedTasks}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    const taskCard = screen.getByText('Test Task');
    fireEvent.dragStart(taskCard);

    expect(mockHandleDragStart).toHaveBeenCalledWith(mockTask);
  });

  it('should call handleDragOver when dragging over a column', () => {
    render(
      <TaskBoard
        groupedTasks={mockGroupedTasks}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    const pendingColumn = screen.getByText('pending').closest('div');
    fireEvent.dragOver(pendingColumn!);

    expect(mockHandleDragOver).toHaveBeenCalled();
  });

  it('should call handleDrop with correct status when dropping a task', () => {
    render(
      <TaskBoard
        groupedTasks={mockGroupedTasks}
        onEditTask={vi.fn()}
        onDeleteTask={vi.fn()}
        onToggleFavorite={vi.fn()}
      />
    );

    const inProgressColumn = screen.getByText('in progress').closest('div');
    fireEvent.drop(inProgressColumn!);

    expect(mockHandleDrop).toHaveBeenCalledWith('in_progress');
  });
}); 