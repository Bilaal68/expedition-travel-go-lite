import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Clean and validate URL and Key
export const isSupabaseConfigured = () => {
  return Boolean(
    envUrl && 
    envKey && 
    envUrl !== 'https://your-project.supabase.co' &&
    envKey !== 'your-anon-key-here' &&
    envKey !== 'your-publishable-key-here' &&
    envUrl.startsWith('https://')
  );
};

// Create the Supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(envUrl, envKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : createClient(
      envUrl || 'https://placeholder.supabase.co',
      envKey || 'placeholder-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
