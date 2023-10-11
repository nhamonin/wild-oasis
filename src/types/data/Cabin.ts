import { Database } from '../supabase';

export type Cabin = Database['public']['Tables']['cabins']['Row'];
export type PartialCabin = Partial<Cabin>;
export type CabinCreation = Omit<Cabin, 'id'>;
