import { useDispatch } from 'react-redux'
import { setUser } from '../store/authSlice'
import { useRouter } from 'next/navigation'

import { LogoutUseCase } from './LogoutUseCase';
import { AuthRepositoryImpl } from '../infrastructure/client/AuthRepositoryImpl';

const loginUseCase = new LogoutUseCase(new AuthRepositoryImpl());

export function useLogout() {
  const dispatch = useDispatch()
  const router = useRouter()

  const logout = async () => {
    try {
      await loginUseCase.execute();

      // if (!response.error) {
      //   throw new Error('Logout failed')
      // }

      // Clear user from Redux store
      dispatch(setUser(null))
      
      // Redirect to login page
      router.replace('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return { logout }
} 