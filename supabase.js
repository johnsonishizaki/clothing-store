const SUPABASE_URL="https://YOUR_PROJECT.supabase.co";
const SUPABASE_KEY="YOUR_ANON_KEY";
const supabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
export default supabase;
