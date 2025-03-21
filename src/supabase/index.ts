import { createClient } from "@supabase/supabase-js"

const supabase = createClient(import.meta.env.VITE_SUPA_URL, import.meta.env.VITE_SUPA_PW);

export default supabase;