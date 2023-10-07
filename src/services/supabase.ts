import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gcflseoolfmxyhqvekox.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Supabase key is missing.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
