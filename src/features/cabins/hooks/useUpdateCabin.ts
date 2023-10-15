import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UseFormReset } from 'react-hook-form';

import { createUpdateCabin as createUpdateCabinApi } from '../../../services/apiCabins';
import { CabinFormInputs, UpdateCabinArgs } from '../../../types';

export function useUpdateCabin(reset: UseFormReset<CabinFormInputs>, onFormClose?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }: UpdateCabinArgs) => createUpdateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully updated!');
      queryClient.invalidateQueries(['cabins']);
      reset();
      onFormClose?.();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { updateCabin, isUpdating };
}
