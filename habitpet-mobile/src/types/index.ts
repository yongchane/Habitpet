// HabitPet 앱 타입 정의

// 기본 타입
export type UUID = string;
export type Timestamp = string;

// 사용자 타입
export interface User {
  id: UUID;
  email: string;
  username?: string;
  avatar_url?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  subscription_type: 'free' | 'premium';
  subscription_expires_at?: Timestamp;
}

// 펫 타입
export interface Pet {
  id: UUID;
  user_id: UUID;
  name: string;
  pet_type: 'cat' | 'dog' | 'rabbit';
  level: number;
  experience: number;
  hunger: number; // 0-100
  happiness: number; // 0-100
  evolution_stage: 1 | 2 | 3 | 4 | 5;
  primary_trait?: PetTrait;
  secondary_trait?: PetTrait;
  trait_points: TraitPoints;
  last_fed_at: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export type PetTrait = 'exercise' | 'study' | 'cooking' | 'music' | 'meditation';

export interface TraitPoints {
  exercise: number;
  study: number;
  cooking: number;
  music: number;
  meditation: number;
}

export interface PetEvolutionHistory {
  id: UUID;
  pet_id: UUID;
  from_stage: number;
  to_stage: number;
  evolved_at: Timestamp;
  trigger_trait: PetTrait;
}

// 습관 타입
export interface Habit {
  id: UUID;
  user_id: UUID;
  title: string;
  description?: string;
  category: HabitCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  target_frequency: number; // 주당 목표 횟수
  points_per_completion: number;
  emoji: string;
  is_active: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export type HabitCategory = 'exercise' | 'study' | 'cooking' | 'music' | 'meditation' | 'other';

export interface HabitRecord {
  id: UUID;
  habit_id: UUID;
  user_id: UUID;
  completed_at: Timestamp;
  points_earned: number;
  note?: string;
  voice_note_url?: string;
  mood_emoji?: string;
  created_at: Timestamp;
}

// 점수 및 통계 타입
export interface UserScore {
  id: UUID;
  user_id: UUID;
  total_points: number;
  daily_points: number;
  weekly_points: number;
  monthly_points: number;
  streak_days: number;
  longest_streak: number;
  last_activity_date: string; // Date string
  updated_at: Timestamp;
}

export interface DailyStats {
  id: UUID;
  user_id: UUID;
  date: string; // Date string
  habits_completed: number;
  total_habits: number;
  points_earned: number;
  category_breakdown: Record<HabitCategory, number>;
  created_at: Timestamp;
}

// API 관련 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateHabitDto {
  title: string;
  description?: string;
  category: HabitCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  target_frequency: number;
  emoji: string;
}

export interface UpdateHabitDto {
  title?: string;
  description?: string;
  category?: HabitCategory;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  target_frequency?: number;
  emoji?: string;
  is_active?: boolean;
}

export interface CreateRecordDto {
  habit_id: UUID;
  note?: string;
  voice_note_url?: string;
  mood_emoji?: string;
}

export interface FeedPetResponse {
  success: boolean;
  new_hunger: number;
  new_happiness: number;
  level_up: boolean;
}

export interface CompleteHabitResponse {
  success: boolean;
  points_earned: number;
  streak_bonus: number;
}

export interface EvolutionCheckResponse {
  should_evolve: boolean;
  dominant_trait: PetTrait;
  trait_points: TraitPoints;
  evolution_threshold: number;
}

// UI 상태 타입
export interface AppState {
  user: User | null;
  pets: {
    current: Pet | null;
    collection: Pet[];
    evolution: PetEvolutionHistory[];
  };
  habits: {
    list: Habit[];
    todayProgress: HabitProgress[];
    statistics: HabitStats;
  };
  ui: {
    loading: boolean;
    activeTab: string;
    modals: ModalState;
    notifications: NotificationState;
  };
}

export interface HabitProgress {
  habit: Habit;
  completed: boolean;
  completedAt?: Timestamp;
  pointsEarned?: number;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  weeklyCompletion: number;
  monthlyCompletion: number;
  categoryBreakdown: Record<HabitCategory, number>;
}

export interface ModalState {
  addHabit: boolean;
  editHabit: boolean;
  petDetail: boolean;
  habitDetail: boolean;
  confirmDialog: boolean;
}

export interface NotificationState {
  visible: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

// 애니메이션 타입
export interface PetAnimationState {
  current: 'idle' | 'happy' | 'eating' | 'sleeping' | 'evolving';
  isPlaying: boolean;
  loop: boolean;
}

// 설정 타입
export interface AppSettings {
  notifications: {
    habitReminders: boolean;
    petStatus: boolean;
    achievements: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en';
  sound: {
    enabled: boolean;
    volume: number;
  };
}

// 오프라인 지원 타입
export interface OfflineAction {
  id: UUID;
  type: 'complete_habit' | 'feed_pet' | 'update_habit';
  payload: any;
  timestamp: Timestamp;
  synced: boolean;
}

// 네비게이션 타입
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
  HabitDetail: { habitId: UUID };
  AddHabit: undefined;
  EditHabit: { habitId: UUID };
  PetDetail: { petId: UUID };
  PetCollection: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Habits: undefined;
  Stats: undefined;
  Profile: undefined;
};

// 유틸리티 타입
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Without<T, K extends keyof T> = Omit<T, K>;
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;