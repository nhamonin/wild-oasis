import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../../services/apiAuth';

type Credentials = {
  email: string;
  password: string;
};

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: (credentials: Credentials) => loginApi(credentials),
    onSuccess() {
      navigate('/dashboard');
    },
    onError(error: Error) {
      console.log('ERROR', error);
      toast.error('Provided email or password are incorrect.');
    },
  });

  return { login, isLoggingIn };
}