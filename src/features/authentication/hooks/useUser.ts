import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../../services/apiAuth';

export function useUser() {
  const { isLoading, data } = useQuery(['user'], getCurrentUser);

  return { user: data?.user, isAuthenticated: data?.user?.role === 'authenticated', isLoading };
}
