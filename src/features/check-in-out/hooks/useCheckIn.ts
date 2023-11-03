import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { updateBooking } from '../../../services/apiBookings';

type MutationArgs = {
  bookingId: number;
  breakfast?: {
    has_breakfast: boolean;
    extras_price: number;
    total_price: number;
  };
};

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationArgs) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries();
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error checking in the booking. Please try again.');
    },
  });

  return { checkIn, isCheckingIn };
}
