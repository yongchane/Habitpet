import { supabase } from '../supabase';
import { Habit, HabitRecord, CreateHabitDto, UpdateHabitDto, CreateRecordDto } from '../../types';

export class HabitService {
  // 사용자의 모든 습관 조회
  static async getHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`습관 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 새로운 습관 생성
  static async createHabit(userId: string, habitData: CreateHabitDto): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .insert({
        user_id: userId,
        ...habitData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`습관 생성 실패: ${error.message}`);
    }

    return data;
  }

  // 습관 업데이트
  static async updateHabit(habitId: string, updates: UpdateHabitDto): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', habitId)
      .select()
      .single();

    if (error) {
      throw new Error(`습관 업데이트 실패: ${error.message}`);
    }

    return data;
  }

  // 습관 삭제 (soft delete)
  static async deleteHabit(habitId: string): Promise<void> {
    const { error } = await supabase
      .from('habits')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', habitId);

    if (error) {
      throw new Error(`습관 삭제 실패: ${error.message}`);
    }
  }

  // 특정 습관 조회
  static async getHabitById(habitId: string): Promise<Habit | null> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('id', habitId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // 데이터가 없는 경우
      }
      throw new Error(`습관 조회 실패: ${error.message}`);
    }

    return data;
  }

  // 습관 기록 생성
  static async createHabitRecord(
    habitId: string,
    userId: string,
    recordData: CreateRecordDto
  ): Promise<HabitRecord> {
    const { data, error } = await supabase
      .from('habit_records')
      .insert({
        user_id: userId,
        ...recordData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`습관 기록 생성 실패: ${error.message}`);
    }

    return data;
  }

  // 습관 기록 조회
  static async getHabitRecords(habitId: string, limit?: number): Promise<HabitRecord[]> {
    let query = supabase
      .from('habit_records')
      .select('*')
      .eq('habit_id', habitId)
      .order('completed_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`습관 기록 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 오늘 습관 기록 조회
  static async getTodayHabitRecords(userId: string): Promise<HabitRecord[]> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const { data, error } = await supabase
      .from('habit_records')
      .select('*')
      .eq('user_id', userId)
      .gte('completed_at', startOfDay.toISOString())
      .lt('completed_at', endOfDay.toISOString())
      .order('completed_at', { ascending: false });

    if (error) {
      throw new Error(`오늘 습관 기록 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 습관 완료 처리 (Supabase Function 사용)
  static async completeHabit(
    habitId: string,
    userId: string,
    note?: string,
    moodEmoji?: string
  ): Promise<{
    success: boolean;
    points_earned: number;
    streak_bonus: number;
  }> {
    const { data, error } = await supabase.rpc('complete_habit', {
      habit_id: habitId,
      user_id: userId,
      note: note || null,
      mood_emoji: moodEmoji || null,
    });

    if (error) {
      throw new Error(`습관 완료 처리 실패: ${error.message}`);
    }

    return data;
  }

  // 기간별 습관 통계 조회
  static async getHabitStats(userId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('habit_records')
      .select(`
        *,
        habits (
          id,
          title,
          category,
          difficulty
        )
      `)
      .eq('user_id', userId)
      .gte('completed_at', startDate)
      .lte('completed_at', endDate)
      .order('completed_at', { ascending: false });

    if (error) {
      throw new Error(`습관 통계 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 연속 달성 기록 조회
  static async getStreakData(userId: string, habitId: string) {
    const { data, error } = await supabase
      .from('habit_records')
      .select('completed_at')
      .eq('user_id', userId)
      .eq('habit_id', habitId)
      .order('completed_at', { ascending: false })
      .limit(100); // 최근 100개 기록

    if (error) {
      throw new Error(`연속 달성 기록 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 카테고리별 습관 수 조회
  static async getHabitsByCategory(userId: string) {
    const { data, error } = await supabase
      .from('habits')
      .select('category')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      throw new Error(`카테고리별 습관 조회 실패: ${error.message}`);
    }

    // 카테고리별 개수 계산
    const categoryCount = (data || []).reduce((acc, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return categoryCount;
  }

  // 습관 검색
  static async searchHabits(userId: string, query: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`습관 검색 실패: ${error.message}`);
    }

    return data || [];
  }
}

export default HabitService;