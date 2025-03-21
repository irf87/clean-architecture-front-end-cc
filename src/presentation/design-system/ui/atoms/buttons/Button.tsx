'use client';

import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import styled, { css } from 'styled-components';

import { ButtonProps, ButtonSize, ButtonVariant } from '@/presentation/design-system/domain/types/ButtonProps';

const getVariantStyles = (variant: ButtonVariant = 'primary') => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.brand.primary};
      color: ${({ theme }) => theme.colors.text.inverse};
      &:hover {
        background-color: ${({ theme }) => theme.colors.interaction.hover.primary};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.interaction.active.primary};
      }
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
      border: 2px solid ${({ theme }) => theme.colors.brand.primary};
      color: ${({ theme }) => theme.colors.brand.primary};
      &:hover {
        background-color: ${({ theme }) => theme.colors.background.hover};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.background.subtle};
      }
    `,
    tertiary: css`
      background-color: transparent;
      color: ${({ theme }) => theme.colors.text.primary};
      &:hover {
        background-color: ${({ theme }) => theme.colors.background.hover};
      }
      &:active {
        background-color: ${({ theme }) => theme.colors.background.subtle};
      }
    `,
  };
  return variants[variant];
};

const getSizeStyles = (size: ButtonSize = 'medium') => {
  const sizes = {
    small: css`
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    `,
    medium: css`
      padding: 0.5rem 1rem;
      font-size: 1rem;
    `,
    large: css`
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    `,
  };
  return sizes[size];
};

const StyledButton = styled.button<ButtonProps>`
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 200ms ease-in-out;
  outline: none;
  cursor: pointer;

  &:focus {
    ring: 2px;
    ring-color: ${({ theme }) => theme.colors.interaction.focus.outline};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;

const LoadingSpinner = styled.div`
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.surface.DEFAULT};
  border-top-color: ${({ theme }) => theme.colors.text.inverse};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        {isLoading && <LoadingSpinner />}
        {children}
      </div>
    </StyledButton>
  );
}; 