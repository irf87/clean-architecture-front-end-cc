import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';
import styled from 'styled-components';

const CardStyled = styled.div<{ draggable?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface.DEFAULT};
  border-radius: 3px;
  padding: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  transition: all 200ms ease-in-out;
  cursor: ${({ draggable }) => draggable ? 'move' : 'default'};

  &:hover {
    box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-items: anchor-center;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const DateInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.disabled};
  font-size: 0.75rem;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  padding-top: 0.75rem;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ $isFavorite, theme }) => 
    $isFavorite ? theme.colors.brand.primary : theme.colors.text.disabled};
  font-size: 1.25rem;
  transition: color 200ms ease-in-out;
  margin-left: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

interface CardProps {
  draggable?: boolean;
  onDragStart: (e: React.DragEvent) => void;
  children: React.ReactNode;
}

function Card({ children, draggable, onDragStart }: CardProps) {
  return <CardStyled draggable={draggable} onDragStart={onDragStart}>{children}</CardStyled>;
}

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.DateInfo = DateInfo;
Card.ButtonContainer = ButtonContainer;
Card.FavoriteButton = FavoriteButton;

export default Card;