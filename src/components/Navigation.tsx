'use client';

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

import { LogoutButton } from '@/domains/auth/ui/LogoutButton'
import { useAppSelector } from '@/store/hooks'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.brand.primary};
  color: white;
`

export function Navigation() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Nav>
      <div>Logo</div>
      {isAuthenticated && <LogoutButton />}
    </Nav>
  )
} 