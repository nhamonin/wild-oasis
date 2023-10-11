import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

export const supabaseUrl = 'https://gcflseoolfmxyhqvekox.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Supabase key is missing.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
