import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

export const supabaseUrl = "https://gzaydwyzcpyygeoiygva.supabase.co";
const supabaseKey = SUPABASE_KEY;
const serviceKey = SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default supabase;
