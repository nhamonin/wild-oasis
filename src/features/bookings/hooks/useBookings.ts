import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../../services/apiBookings';

export function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  const [sortByValue, sortByMethod] = searchParams.get('sort_by')?.split('-') ?? ['start_date', 'desc'];
  const sortBy = !sortByValue ? null : { field: sortByValue, method: sortByMethod as 'asc' | 'desc' };

  const { isLoading, data: bookings, error } = useQuery(
    ['bookings', filter, sortBy],
    () => getBookings({ filter, sortBy })
  );

  return { isLoading, bookings, error };
}
