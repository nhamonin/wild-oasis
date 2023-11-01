import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../../services/apiBookings';
import { PAGE_SIZE } from '../../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue };

  const [sortByValue, sortByMethod] = searchParams.get('sort_by')?.split('-') ?? [
    'start_date',
    'desc',
  ];
  const sortBy = !sortByValue
    ? null
    : { field: sortByValue, method: sortByMethod as 'asc' | 'desc' };

  const page = Number(searchParams.get('page')) || 1;

  const { isLoading, data, error } = useQuery(
    ['bookings', filter, sortBy, page],
    () => getBookings({ filter, sortBy, page }),
    {
      select: (response) => {
        return {
          bookings: response?.data,
          count: response?.count,
        };
      },
    }
  );

  const pageCount = Math.ceil(data?.count || 1 / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery(['bookings', filter, sortBy, page + 1], () =>
      getBookings({ filter, sortBy, page: page + 1 })
    );
  }

  if (page > 1) {
    queryClient.prefetchQuery(['bookings', filter, sortBy, page - 1], () =>
      getBookings({ filter, sortBy, page: page - 1 })
    );
  }

  return { isLoading, bookings: data?.bookings, count: data?.count, error };
}
