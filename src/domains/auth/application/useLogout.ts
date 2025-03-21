import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { LogoutUseCase } from '@/domains/auth/application/LogoutUseCase';
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/client/AuthRepositoryImpl';
import { setUser } from '@/domains/auth/store/authSlice'

const logoutUseCase = new LogoutUseCase(new AuthRepositoryImpl());

export function useLogout() {
  const dispatch = useDispatch()
  const router = useRouter()

  const logout = async () => {
    try {
      await logoutUseCase.execute();
      dispatch(setUser(null))
      router.replace('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return { logout }
} 