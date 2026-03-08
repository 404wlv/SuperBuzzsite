import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://tzttlodctoupzsxeyoyx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ekbGAJojTVYggvnyBd9wrA_jVWdWrCY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);