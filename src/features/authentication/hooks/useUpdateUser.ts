import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateUser as updateCurrentUser } from '../../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User account successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { updateUser, isUpdating };
}
