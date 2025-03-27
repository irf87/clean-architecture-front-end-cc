'use client';

import { styled } from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const Content = styled.div`
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
  }
`;
export function Container({ children, className }: ContainerProps) {
  return (
    <StyledContainer className={className}>
      <Content>
        {children}
      </Content>
    </StyledContainer>
  );
} 