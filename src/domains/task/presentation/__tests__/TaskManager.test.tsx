import { fireEvent, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RenderResult } from '@testing-library/react';

import { TaskManager } from '@/domains/task/presentation/TaskManager';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { render } from '@/test/test-utils';
import { useTask } from '@/domains/task/application/useTask';

vi.mock('@/domains/task/presentation/TaskBoard', () => ({
  TaskBoard: vi.fn(({ onEditTask, onDeleteTask }) => (
    <div>
      <button onClick={() => onEditTask({ id: '1' })}>edit</button>
      <button onClick={() => onDeleteTask({ id: '1' })}>delete</button>
    </div>
  )),
}));

vi.mock('@/domains/task/presentation/TaskFormModal', () => ({
  TaskFormModal: vi.fn(({ onSubmit }) => (
    <div>
      <label htmlFor="title">Title</label>
      <input id="title" />
      <label htmlFor="description">Description</label>
      <input id="description" />
      <button onClick={() => onSubmit({
        title: 'New Task',
        description: 'New Description',
        status: 'pending',
        isFavorite: false,
      })}>
        create task
      </button>
      <button onClick={() => onSubmit({
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'pending',
        isFavorite: false,
      })}>
        update task
      </button>
    </div>
  )),
}));

vi.mock('@/domains/task/presentation/DeleteTaskConfirmationModal', () => ({
  DeleteTaskConfirmationModal: vi.fn(({ onConfirm }) => (
    <div>
      <div>Delete Task</div>
      <div>Are you sure you want to delete this task?</div>
      <button onClick={onConfirm}>confirm</button>
    </div>
  )),
}));

const mockTasks = {
  pending: [] as TaskNode[],
  in_progress: [] as TaskNode[],
  done: [] as TaskNode[],
};

const mockUseTaskReturn = {
  cleanError: vi.fn(),
  createNewTask: vi.fn(),
  updateExistingTask: vi.fn(),
  deleteTask: vi.fn(),
  toggleFavorite: vi.fn(),
  updateTaskStatus: vi.fn(),
  error: '',
  isLoading: false,
  tasks: mockTasks,
};

vi.mock('@/domains/task/application/useTask', () => ({
  useTask: vi.fn(() => mockUseTaskReturn),
}));

describe('TaskManager', () => {
  const mockTask: TaskNode = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending' as TaskStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: '',
    isFavorite: false,
  };

  const renderTaskManager = async (): Promise<RenderResult> => {
    let result: RenderResult;
    await act(async () => {
      result = render(<TaskManager />);
    });
    return result!;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Delete Task', () => {
    it('should show delete confirmation modal when delete button is clicked', async () => {
      await renderTaskManager();
      
      vi.mocked(useTask).mockImplementation(() => ({
        ...mockUseTaskReturn,
        tasks: {
          ...mockTasks,
          pending: [mockTask],
        },
      }));

      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      expect(screen.getByText('Delete Task')).toBeInTheDocument();
      expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
    });

    it('should call deleteTask when user confirms deletion', async () => {
      const mockDeleteTask = vi.fn();
      vi.mocked(useTask).mockImplementation(() => ({
        ...mockUseTaskReturn,
        deleteTask: mockDeleteTask,
        tasks: {
          ...mockTasks,
          pending: [mockTask],
        },
      }));

      await renderTaskManager();

      const deleteButton = screen.getByRole('button', { name: /delete/i });
      await act(async () => {
        fireEvent.click(deleteButton);
      });

      const confirmButton = screen.getByRole('button', { name: /confirm/i });
      await act(async () => {
        fireEvent.click(confirmButton);
      });

      expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);
    });
  });

  describe('Form Submission', () => {
    it('should close modal after successful task creation', async () => {
      const mockCreateNewTask = vi.fn().mockResolvedValue(true);
      vi.mocked(useTask).mockImplementation(() => ({
        ...mockUseTaskReturn,
        createNewTask: mockCreateNewTask,
      }));

      await renderTaskManager();

      const addButton = screen.getByRole('button', { name: /add task/i });
      await act(async () => {
        fireEvent.click(addButton);
      });

      const titleInput = screen.getByLabelText(/title/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      await act(async () => {
        fireEvent.change(titleInput, { target: { value: 'New Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
      });

      const submitButton = screen.getByRole('button', { name: /create task/i });
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(mockCreateNewTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'New Description',
        status: 'pending',
        isFavorite: false,
      });
    });

    it('should close modal after successful task update', async () => {
      const mockUpdateExistingTask = vi.fn().mockResolvedValue(true);
      vi.mocked(useTask).mockImplementation(() => ({
        ...mockUseTaskReturn,
        updateExistingTask: mockUpdateExistingTask,
        tasks: {
          ...mockTasks,
          pending: [mockTask],
        },
      }));

      await renderTaskManager();

      const editButton = screen.getByRole('button', { name: /edit/i });
      await act(async () => {
        fireEvent.click(editButton);
      });

      const titleInput = screen.getByLabelText(/title/i);
      const descriptionInput = screen.getByLabelText(/description/i);
      await act(async () => {
        fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
      });

      const submitButton = screen.getByRole('button', { name: /update task/i });
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(mockUpdateExistingTask).toHaveBeenCalledWith(mockTask.id, {
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'pending',
        isFavorite: false,
      });
    });
  });
}); 