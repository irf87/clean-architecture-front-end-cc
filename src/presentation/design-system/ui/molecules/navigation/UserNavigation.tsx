'use client';

import { styled } from 'styled-components';

import { Button } from '../../atoms/buttons/Button';

const StyledEmail = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

interface UserNavigationProps {
  email: string;
  onLogout: () => void;
}

export function UserNavigation({ email, onLogout }: UserNavigationProps) {
  return (
    <Container>
      <StyledEmail>{email}</StyledEmail>
      <Button
        variant="tertiary"
        size="small"
        onClick={onLogout}
      >
        Logout
      </Button>
    </Container>
  );
}