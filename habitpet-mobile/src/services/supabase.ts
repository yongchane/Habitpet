import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Supabase 설정
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL과 Anon Key가 설정되지 않았습니다.');
}

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 타입 정의
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          username: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          subscription_type: string;
          subscription_expires_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          subscription_type?: string;
          subscription_expires_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          subscription_type?: string;
          subscription_expires_at?: string | null;
        };
      };
      habits: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: string;
          difficulty: number;
          target_frequency: number;
          points_per_completion: number;
          emoji: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: string;
          difficulty?: number;
          target_frequency?: number;
          points_per_completion?: number;
          emoji?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          difficulty?: number;
          target_frequency?: number;
          points_per_completion?: number;
          emoji?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          pet_type: string;
          level: number;
          experience: number;
          hunger: number;
          happiness: number;
          evolution_stage: number;
          primary_trait: string | null;
          secondary_trait: string | null;
          trait_points: any;
          last_fed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          pet_type: string;
          level?: number;
          experience?: number;
          hunger?: number;
          happiness?: number;
          evolution_stage?: number;
          primary_trait?: string | null;
          secondary_trait?: string | null;
          trait_points?: any;
          last_fed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          pet_type?: string;
          level?: number;
          experience?: number;
          hunger?: number;
          happiness?: number;
          evolution_stage?: number;
          primary_trait?: string | null;
          secondary_trait?: string | null;
          trait_points?: any;
          last_fed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      habit_records: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          completed_at: string;
          points_earned: number;
          note: string | null;
          voice_note_url: string | null;
          mood_emoji: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          completed_at?: string;
          points_earned: number;
          note?: string | null;
          voice_note_url?: string | null;
          mood_emoji?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          habit_id?: string;
          user_id?: string;
          completed_at?: string;
          points_earned?: number;
          note?: string | null;
          voice_note_url?: string | null;
          mood_emoji?: string | null;
          created_at?: string;
        };
      };
      user_scores: {
        Row: {
          id: string;
          user_id: string;
          total_points: number;
          daily_points: number;
          weekly_points: number;
          monthly_points: number;
          streak_days: number;
          longest_streak: number;
          last_activity_date: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_points?: number;
          daily_points?: number;
          weekly_points?: number;
          monthly_points?: number;
          streak_days?: number;
          longest_streak?: number;
          last_activity_date?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_points?: number;
          daily_points?: number;
          weekly_points?: number;
          monthly_points?: number;
          streak_days?: number;
          longest_streak?: number;
          last_activity_date?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      feed_pet: {
        Args: {
          pet_id: string;
          food_amount: number;
        };
        Returns: {
          success: boolean;
          new_hunger: number;
          new_happiness: number;
          level_up: boolean;
        };
      };
      complete_habit: {
        Args: {
          habit_id: string;
          user_id: string;
          note?: string;
          mood_emoji?: string;
        };
        Returns: {
          success: boolean;
          points_earned: number;
          streak_bonus: number;
        };
      };
      check_pet_evolution: {
        Args: {
          pet_id: string;
        };
        Returns: {
          should_evolve: boolean;
          dominant_trait: string;
          trait_points: any;
          evolution_threshold: number;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export default supabase;