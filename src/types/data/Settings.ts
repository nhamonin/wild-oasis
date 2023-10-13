import { Database } from '../supabase';

export type Settings = Database['public']['Tables']['settings']['Row'];
export type SettingsToUpdate = Omit<Settings, 'id' | 'created_at'>;
