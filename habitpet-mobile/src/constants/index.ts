// HabitPet 앱 상수 정의

// 색상 상수
export const COLORS = {
  // Primary Colors
  PRIMARY: '#4ECDC4',
  PRIMARY_DARK: '#3BA99C',
  SECONDARY: '#FFD1DC',
  ACCENT: '#FFA726',

  // Background Colors
  BACKGROUND: '#FEF7F0',
  CARD_BACKGROUND: '#FFFFFF',
  PET_HOME_BACKGROUND: '#F0F8FF',
  FEEDING_SECTION_BACKGROUND: '#FFF8E1',
  MODAL_BACKGROUND: 'rgba(0, 0, 0, 0.4)',

  // Text Colors
  TEXT_PRIMARY: '#5D4037',
  TEXT_SECONDARY: '#8D6E63',
  TEXT_ACCENT: '#2E7D32',
  TEXT_DISABLED: '#BDBDBD',

  // 특성별 색상
  TRAIT_COLORS: {
    exercise: '#FF8A80',
    study: '#81D4FA',
    cooking: '#FFCC80',
    music: '#CE93D8',
    meditation: '#A5D6A7',
    other: '#E0E0E0',
  },

  // 상태 색상
  STATUS: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
  },
} as const;

// 폰트 크기 상수
export const FONT_SIZES = {
  TITLE: 24,
  SUBTITLE: 20,
  BODY: 16,
  CAPTION: 14,
  BUTTON: 16,
} as const;

// 간격 상수
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
} as const;

// 둥근 모서리 상수
export const BORDER_RADIUS = {
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
} as const;

// 펫 관련 상수
export const PET_CONSTANTS = {
  TYPES: ['cat', 'dog', 'rabbit'] as const,
  EVOLUTION_STAGES: [1, 2, 3, 4, 5] as const,
  TRAITS: ['exercise', 'study', 'cooking', 'music', 'meditation'] as const,
  
  // 펫 상태 범위
  HUNGER_RANGE: { MIN: 0, MAX: 100 },
  HAPPINESS_RANGE: { MIN: 0, MAX: 100 },
  
  // 진화 임계값
  EVOLUTION_THRESHOLDS: {
    STAGE_2: 100,
    STAGE_3: 300,
    STAGE_4: 600,
    STAGE_5: 1000,
  },
  
  // 펫 크기 (픽셀)
  SPRITE_SIZES: {
    STAGE_1: 16,
    STAGE_2: 20,
    STAGE_3: 24,
    STAGE_4: 28,
    STAGE_5: 32,
  },
} as const;

// 습관 관련 상수
export const HABIT_CONSTANTS = {
  CATEGORIES: ['exercise', 'study', 'cooking', 'music', 'meditation', 'other'] as const,
  DIFFICULTIES: [1, 2, 3, 4, 5] as const,
  
  // 기본 점수
  BASE_POINTS_PER_COMPLETION: 10,
  
  // 난이도별 점수 배수
  DIFFICULTY_MULTIPLIERS: {
    1: 1.0,
    2: 1.2,
    3: 1.5,
    4: 2.0,
    5: 2.5,
  },
  
  // 연속 달성 보너스
  STREAK_BONUS: {
    MAX_BONUS: 50,
    BONUS_PER_DAY: 2,
  },
  
  // 카테고리별 이모지
  CATEGORY_EMOJIS: {
    exercise: '🏃‍♂️',
    study: '📚',
    cooking: '🍳',
    music: '🎵',
    meditation: '🧘‍♀️',
    other: '⭐',
  },
  
  // 먹이 아이콘
  FOOD_ICONS: {
    exercise: '🥕',
    study: '🍎',
    cooking: '🥛',
    music: '🍯',
    meditation: '🥜',
    other: '🌟',
  },
} as const;

// 애니메이션 상수
export const ANIMATION_CONSTANTS = {
  DURATIONS: {
    QUICK: 200,
    NORMAL: 300,
    SLOW: 500,
    EVOLUTION: 2000,
  },
  
  EASINGS: {
    EASE_OUT: 'ease-out',
    EASE_IN: 'ease-in',
    SPRING: 'spring',
  },
  
  PET_ANIMATIONS: {
    IDLE: 'idle',
    HAPPY: 'happy',
    EATING: 'eating',
    SLEEPING: 'sleeping',
    EVOLVING: 'evolving',
  },
} as const;

// 알림 상수
export const NOTIFICATION_CONSTANTS = {
  TYPES: {
    HABIT_REMINDER: 'habit_reminder',
    PET_STATUS: 'pet_status',
    EVOLUTION: 'evolution',
    ACHIEVEMENT: 'achievement',
  },
  
  CHANNELS: {
    HABIT_REMINDERS: 'habit-reminders',
    PET_UPDATES: 'pet-updates',
    ACHIEVEMENTS: 'achievements',
  },
} as const;

// 저장소 키 상수
export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  PET_DATA: 'pet_data',
  HABITS_DATA: 'habits_data',
  SETTINGS: 'app_settings',
  OFFLINE_ACTIONS: 'offline_actions',
  FIRST_LAUNCH: 'first_launch',
} as const;

// API 상수
export const API_CONSTANTS = {
  ENDPOINTS: {
    AUTH: '/auth',
    HABITS: '/habits',
    PETS: '/pets',
    RECORDS: '/records',
    STATS: '/stats',
  },
  
  FUNCTIONS: {
    FEED_PET: 'feed_pet',
    COMPLETE_HABIT: 'complete_habit',
    CHECK_EVOLUTION: 'check_pet_evolution',
    CALCULATE_STATS: 'calculate_daily_stats',
  },
  
  STORAGE_BUCKETS: {
    HABIT_RECORDS: 'habit-records',
    PET_SPRITES: 'pet-sprites',
    USER_AVATARS: 'user-avatars',
  },
} as const;

// 화면 크기 상수
export const SCREEN_CONSTANTS = {
  BREAKPOINTS: {
    SM: 375, // iPhone SE
    MD: 390, // iPhone 14
    LG: 428, // iPhone 14 Plus
  },
  
  HEADER_HEIGHT: 44,
  TAB_BAR_HEIGHT: 83,
  STATUS_BAR_HEIGHT: 44,
} as const;

// 게임 상수
export const GAME_CONSTANTS = {
  // 점수를 먹이로 변환하는 비율
  POINTS_TO_FOOD_RATIO: 0.1,
  
  // 펫 상태 감소 속도 (시간당)
  HUNGER_DECAY_RATE: 2,
  HAPPINESS_DECAY_RATE: 1,
  
  // 레벨업 필요 경험치
  LEVEL_UP_EXPERIENCE: (level: number) => level * 100,
  
  // 특성 발현 임계값
  TRAIT_THRESHOLD: 0.3, // 30% 이상
  
  // 하이브리드 펫 조건
  HYBRID_THRESHOLD: 0.25, // 25% 이상 두 특성
} as const;

// 에러 메시지 상수
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요',
  AUTH_ERROR: '로그인이 필요합니다',
  HABIT_NOT_FOUND: '습관을 찾을 수 없습니다',
  PET_NOT_FOUND: '펫을 찾을 수 없습니다',
  INVALID_INPUT: '입력 정보를 확인해주세요',
  SERVER_ERROR: '서버 오류가 발생했습니다',
} as const;

// 성공 메시지 상수
export const SUCCESS_MESSAGES = {
  HABIT_COMPLETED: '습관을 완료했어요!',
  PET_FED: '펫에게 먹이를 줬어요!',
  LEVEL_UP: '레벨업했어요!',
  EVOLUTION: '펫이 진화했어요!',
  HABIT_ADDED: '새로운 습관이 추가되었어요!',
  SETTINGS_SAVED: '설정이 저장되었어요!',
} as const;

// 개발 환경 상수
export const ENV_CONSTANTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;