import supabase from './supabase';
import { Booking } from '../types';
import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';

type Filter = {
  method?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
  field: string;
  value: string;
} | null;

type SortBy = {
  field: string;
  method: 'asc' | 'desc';
} | null;

export async function getBookings({ filter, sortBy, page }: { filter: Filter; sortBy: SortBy, page: number }) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)', { count: 'exact' });

  if (filter !== null) {
    switch (filter.method) {
      case 'eq':
        query = query.eq(filter.field, filter.value);
        break;
      case 'gt':
        query = query.gt(filter.field, filter.value);
        break;
      case 'lt':
        query = query.lt(filter.field, filter.value);
        break;
      case 'gte':
        query = query.gte(filter.field, filter.value);
        break;
      case 'lte':
        query = query.lte(filter.field, filter.value);
        break;
      default:
        query = query.eq(filter.field, filter.value);
        break;
    }
  }

  if (sortBy !== null) {
    query = query.order(sortBy.field, { ascending: sortBy.method === 'asc' });
  }

  if (page) {
    query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return { data, count };
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id: number, obj: Partial<Booking>) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: string) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
