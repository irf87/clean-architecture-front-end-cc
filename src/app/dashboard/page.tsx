'use client';


import { useLogout } from '@/domains/auth/application/useLogout';
import { useAuth } from '@/domains/auth/domain/useAuth';
import { TaskManager } from '@/domains/task/presentation/TaskManager';
import { NavigationBar } from '@/presentation/design-system/ui/organisms/navigation/NavigationBar';

export default function DashBoardPage() {
  const { logout } = useLogout();
  const { user } = useAuth();
  return (
    <div>
      <NavigationBar 
        userEmail={user?.email || ''}
        onLogout={logout}
      />
      <TaskManager />
    </div>
  );
} 