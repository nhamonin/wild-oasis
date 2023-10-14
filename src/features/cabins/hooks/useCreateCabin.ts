import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UseFormReset } from 'react-hook-form';

import { createUpdateCabin as createEditCabinApi } from '../../../services/apiCabins';
import { CabinFormInputs } from '../../../types';

export function useCreateCabin(reset?: UseFormReset<CabinFormInputs>, onFormClose?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      queryClient.invalidateQueries(['cabins']);
      reset && reset();
      onFormClose && onFormClose();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
}
