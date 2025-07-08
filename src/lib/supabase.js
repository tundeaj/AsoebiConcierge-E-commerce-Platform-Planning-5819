import { createClient } from '@supabase/supabase-js'

// Project credentials from Supabase
const SUPABASE_URL = 'https://fytltxyrkkvcpnzaqpyc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dGx0eHlya2t2Y3BuemFxcHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzMzNjQsImV4cCI6MjA2NzQ0OTM2NH0.k_c2PW8kl6SMLhb0k31vf-zJibm2Av4VCv8LW4uyLIk'

// Check if we have valid Supabase credentials
if (SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export default supabase