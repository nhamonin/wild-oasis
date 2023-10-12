import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UseFormReset } from 'react-hook-form';

import { createEditCabin as createEditCabinApi } from '../../../services/apiCabins';
import { CabinFormInputs, EditCabinArgs } from '../../../types';

export function useEditCabin(reset: UseFormReset<CabinFormInputs>, onFormClose: () => void) {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinArgs) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      queryClient.invalidateQueries(['cabins']);
      reset();
      onFormClose();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { isEditing, editCabin };
}
