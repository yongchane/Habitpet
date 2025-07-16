import { supabase } from '../supabase';
import { User } from '../../types';

export const authService = {
  async signUp(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Convert Supabase User to our User type
      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username,
          avatar_url: data.user.user_metadata?.avatar_url,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
          subscription_type: 'free',
          subscription_expires_at: undefined,
        };
      }
      return null;
    } catch (error) {
      console.error('Error signing up:', error);
      return null;
    }
  },

  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Convert Supabase User to our User type
      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username,
          avatar_url: data.user.user_metadata?.avatar_url,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
          subscription_type: 'free',
          subscription_expires_at: undefined,
        };
      }
      return null;
    } catch (error) {
      console.error('Error signing in:', error);
      return null;
    }
  },

  async signOut(): Promise<boolean> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  },

  async resetPassword(email: string): Promise<boolean> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  },
};