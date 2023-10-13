import { Database } from '../supabase';

export type Settings = Database['public']['Tables']['settings']['Row'];
export type PartialSettings = Partial<Settings>;
