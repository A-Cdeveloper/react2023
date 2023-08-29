import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabaseUrl = "https://gzaydwyzcpyygeoiygva.supabase.co";
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
