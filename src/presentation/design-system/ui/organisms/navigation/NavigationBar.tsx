'use client';

import { styled } from 'styled-components';

import { UserNavigation } from '../../molecules/navigation/UserNavigation';

const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.brand.primary};
`;

interface NavigationBarProps {
  userEmail: string;
  onLogout: () => void;
}

export function NavigationBar({ userEmail, onLogout }: NavigationBarProps) {
  return (
    <NavContainer>
      <NavContent>
        <Logo>APP</Logo>
        <UserNavigation 
          email={userEmail}
          onLogout={onLogout}
        />
      </NavContent>
    </NavContainer>
  );
}