import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  isConfigured: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (mounted) {
        if (!error && initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
        } else {
          setSession(null);
          setUser(null);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setSession(null);
        setUser(null);
        setLoading(false);
      }
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user || null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [configured]);

  const signIn = async ({ email, password }) => {
    if (!configured) {
      // Allow demo login when Supabase credentials are not configured yet
      const mockUser = {
        id: 'demo-admin-id',
        email: email || 'expeditionsguzo@gmail.com',
        role: 'authenticated',
        user_metadata: { role: 'admin', name: 'Expedition Travel Administrator' },
      };
      setUser(mockUser);
      setSession({ user: mockUser, access_token: 'mock-token' });
      return { user: mockUser };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const loginDemo = () => {
    const mockUser = {
      id: 'demo-admin-id',
      email: 'expeditionsguzo@gmail.com',
      role: 'authenticated',
      user_metadata: { role: 'admin', name: 'Expedition Travel Administrator' },
    };
    setUser(mockUser);
    setSession({ user: mockUser, access_token: 'mock-token' });
    return { user: mockUser };
  };

  const signOut = async () => {
    if (configured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    isAdmin: Boolean(user),
    isConfigured: configured,
    signIn,
    loginDemo,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
