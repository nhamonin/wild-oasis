import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../../../services/apiAuth';

type Signup = {
  email: string;
  password: string;
  fullName: string;
};

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data: Signup) => signupApi(data),
    onSuccess(user) {
      queryClient.setQueriesData(['user'], user);
      toast.success('Account created successfully!');
    },
    onError(error: Error) {
      console.log('ERROR', error);
      toast.error('Something went wrong.');
    },
  });

  return { signup, isLoading };
}
