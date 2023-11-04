import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '../../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully deleted!');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { deleteBooking, isDeletingBooking };
}
