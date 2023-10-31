import { Database } from '../supabase';

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type FullBooking = Booking & {
  cabins: Database['public']['Tables']['cabins']['Row'] | null,
  guests: Database['public']['Tables']['guests']['Row'] | null
};
export type PartialBooking = Partial<Booking>;
export type BookingCreation = Omit<Booking, 'id'>;
