import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBooking } from '../../../services/apiBookings';

export function useBooking() {
  const { bookingId } = useParams();

  if (!bookingId) throw new Error('Booking ID is required');

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery(['booking', bookingId], () => getBooking(bookingId), {
    retry: false,
  });

  return { isLoading, booking, error };
}
