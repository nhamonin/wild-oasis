import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { logout as logoutApi } from '../../../services/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess() {
      queryClient.removeQueries();
      navigate('/', { replace: true });
    },
    onError(error: Error) {
      console.log('ERROR', error);
      toast.error('Something went wrong.');
    },
  });

  return { logout, isLoggingOut };
}
