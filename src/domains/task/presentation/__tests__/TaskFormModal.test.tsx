import { fireEvent, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RenderResult } from '@testing-library/react';

import { TaskFormModal } from '@/domains/task/presentation/TaskFormModal';
import { TASK_ERRORS } from '@/domains/task/domain/TaskConstants';
import { TaskNode, TaskStatus } from '@/domains/task/domain/TaskTypes';
import { render } from '@/test/test-utils';

describe('TaskFormModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();
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

  const fillForm = async (titleValue = 'Test Title', descriptionValue = 'This is a test description') => {
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    await act(async () => {
      fireEvent.change(titleInput, { target: { value: titleValue } });
      fireEvent.change(descriptionInput, { target: { value: descriptionValue } });
    });
  };

  const renderModal = async (props = {}): Promise<RenderResult> => {
    let result: RenderResult;
    await act(async () => {
      result = render(
        <TaskFormModal
          open={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          mode="create"
          {...props}
        />
      );
    });
    return result!;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Validation', () => {
    it('should disable submit button when form is empty', async () => {
      await renderModal();
      const submitButton = screen.getByRole('button', { name: /create task/i });
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });

    it('should disable submit button when title is less than 3 characters', async () => {
      await renderModal();
      await fillForm('ab', 'This is a test description');
      const submitButton = screen.getByRole('button', { name: /create task/i });
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });

    it('should disable submit button when description is less than 10 characters', async () => {
      await renderModal();
      await fillForm('Valid Title', 'Too short');
      const submitButton = screen.getByRole('button', { name: /create task/i });
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });

    it('should enable submit button when all fields are valid', async () => {
      await renderModal();
      await fillForm();
      const submitButton = screen.getByRole('button', { name: /create task/i });
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Modal Mode', () => {
    it('should show create mode title and button text', async () => {
      await renderModal();
      expect(screen.getByText('Create New Task')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
    });

    it('should show edit mode title and button text', async () => {
      await renderModal({ mode: 'edit', task: mockTask });
      expect(screen.getByText('Edit Task')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
    });

    it('should populate form fields in edit mode', async () => {
      await renderModal({ mode: 'edit', task: mockTask });

      await waitFor(() => {
        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const statusSelect = screen.getByLabelText(/status/i);
        const favoriteCheckbox = screen.getByRole('checkbox');

        expect(titleInput).toHaveValue(mockTask.title);
        expect(descriptionInput).toHaveValue(mockTask.description);
        expect(statusSelect).toHaveValue(mockTask.status);
        expect(favoriteCheckbox).not.toBeChecked();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display duplicate title error in title input', async () => {
      await renderModal({ error: TASK_ERRORS.DUPLICATE_TITLE });
      const titleInput = screen.getByLabelText(/title/i);
      const helperText = screen.getByText(TASK_ERRORS.DUPLICATE_TITLE);
      expect(helperText).toBeInTheDocument();
      expect(titleInput.parentElement).toContainElement(helperText);
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with form data when submitted', async () => {
      await renderModal();
      await fillForm();
      const statusSelect = screen.getByLabelText(/status/i);
      const favoriteCheckbox = screen.getByRole('checkbox');

      await act(async () => {
        fireEvent.change(statusSelect, { target: { value: 'in_progress' } });
        fireEvent.click(favoriteCheckbox);
      });

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /create task/i });
        expect(submitButton).not.toBeDisabled();
      });

      const submitButton = screen.getByRole('button', { name: /create task/i });
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Title',
          description: 'This is a test description',
          status: 'in_progress',
          isFavorite: true,
        });
      });
    });
  });

  describe('Modal Closing', () => {
    it('should call onClose when cancel button is clicked', async () => {
      await renderModal();
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await act(async () => {
        fireEvent.click(cancelButton);
      });
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should close modal after successful submission', async () => {
      mockOnSubmit.mockResolvedValue(true);
      await renderModal();
      await fillForm();
      
      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /create task/i });
        expect(submitButton).not.toBeDisabled();
      });

      const submitButton = screen.getByRole('button', { name: /create task/i });
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should not close modal after failed submission', async () => {
      mockOnSubmit.mockResolvedValue(false);
      await renderModal();
      await fillForm();
      
      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /create task/i });
        expect(submitButton).not.toBeDisabled();
      });

      const submitButton = screen.getByRole('button', { name: /create task/i });
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });
}); 