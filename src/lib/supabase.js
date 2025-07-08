import { createClient } from '@supabase/supabase-js'

// Mock credentials for development - replace with actual credentials
const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

// Fallback for missing credentials
const mockSupabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
    signOut: () => Promise.resolve({ error: null }),
    updateUser: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
        order: () => Promise.resolve({ data: [], error: null })
      }),
      order: () => Promise.resolve({ data: [], error: null }),
      gt: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: () => ({
      select: () => Promise.resolve({ data: [], error: null })
    }),
    update: () => ({
      eq: () => ({
        select: () => Promise.resolve({ data: [], error: null })
      })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null })
    })
  }),
  channel: () => ({
    on: () => ({ subscribe: () => {} })
  })
}

// Check if we have valid Supabase credentials
const hasValidCredentials = SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL !== 'https://your-project.supabase.co' && 
  SUPABASE_ANON_KEY !== 'your-anon-key'

export const supabase = hasValidCredentials 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : mockSupabase

export default supabase