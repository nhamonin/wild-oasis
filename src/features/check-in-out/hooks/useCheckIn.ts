import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../../services/apiBookings";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId: number) => updateBooking(bookingId, {
      status: 'checked-in',
      is_paid: true,
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries(['booking', data.id]);
      navigate('/');
    },
    onError: () => {
      toast.error('There was an error checking in the booking. Please try again.');
    }
  });

  return { checkIn, isCheckingIn };
}