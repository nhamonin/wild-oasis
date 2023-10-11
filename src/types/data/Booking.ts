import { Database } from '../supabase';

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type PartialBooking = Partial<Booking>;
export type BookingCreation = Omit<Booking, 'id'>;
