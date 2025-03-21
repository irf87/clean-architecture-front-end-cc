'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { InputProps } from '@/presentation/design-system/domain/types/InputProps';

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInput = styled.input<{ error?: boolean }>`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.status.error.DEFAULT : theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 100%;
  transition: all 200ms ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => 
      error ? theme.colors.status.error.DEFAULT : theme.colors.border.focus};
    box-shadow: 0 0 0 2px ${({ theme, error }) => 
      error ? theme.colors.status.error.light : theme.colors.status.info.light};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.subtle};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme, error }) => 
    error ? theme.colors.status.error.DEFAULT : theme.colors.text.secondary};
`;

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = false,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <InputContainer fullWidth={fullWidth} className={className}>
      <StyledLabel htmlFor={inputId}>
        {label}
      </StyledLabel>
      <StyledInput
        id={inputId}
        error={error}
        {...props}
      />
      {helperText && (
        <HelperText error={error}>
          {helperText}
        </HelperText>
      )}
    </InputContainer>
  );
}; 