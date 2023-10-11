import { Database } from '../supabase';

export type Guest = Database['public']['Tables']['guests']['Row'];
export type PartialGuest = Partial<Guest>;
export type GuestCreation = Omit<Guest, 'id'>;
