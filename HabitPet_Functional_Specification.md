# HabitPet 기능 명세서

_습관 형성과 펫 키우기가 결합된 게이미피케이션 라이프스타일 앱_

---

## 📋 문서 개요

### 목적

본 문서는 HabitPet 앱의 기능적 요구사항을 UI/UX, 프론트엔드, 백엔드 영역별로 상세히 정의합니다.

### 범위

- MVP (1단계) 기능 중심으로 작성
- React Native + Supabase 기반 아키텍처
- 픽셀 펫 개성화 시스템 핵심 기능 포함

### 기술 스택

- **Frontend**: React Native + TypeScript + Expo
- **Backend**: Supabase (PostgreSQL + Realtime + Auth + Storage)
- **State Management**: Zustand 또는 Redux Toolkit
- **Animation**: React Native Reanimated 3
- **UI Library**: NativeBase 또는 Tamagui

---

## 🎨 UI/UX 기능 명세

### 1. 온보딩 & 인증

#### 1.1 스플래시 스크린

**기능 설명**: 앱 로딩 시 브랜드 아이덴티티 표시

- **UI 요소**:
  - HabitPet 로고 (픽셀 아트 스타일)
  - 로딩 애니메이션 (펫이 움직이는 모션)
  - 진행률 표시바
- **UX 플로우**:
  1. 로고 페이드인 (0.5초)
  2. 펫 애니메이션 시작 (1초)
  3. 데이터 로딩 완료 후 메인 화면 전환

#### 1.2 온보딩 플로우

**기능 설명**: 신규 사용자 가이드 및 초기 설정

- **UI 요소**:
  - 4개 온보딩 슬라이드
  - 스와이프 네비게이션
  - 건너뛰기 버튼
  - 시작하기 CTA 버튼
- **UX 플로우**:
  1. 앱 소개 (습관 + 펫 키우기)
  2. 픽셀 펫 개성화 설명
  3. 점수 시스템 안내
  4. 첫 펫 선택 화면으로 이동

#### 1.3 인증 화면

**기능 설명**: 사용자 로그인/회원가입

- **UI 요소**:
  - 이메일/비밀번호 입력 필드
  - 소셜 로그인 버튼 (Google, Apple)
  - 회원가입/로그인 토글
  - 비밀번호 찾기 링크
- **UX 플로우**:
  - 간편 소셜 로그인 우선 노출
  - 이메일 로그인은 하단에 배치
  - 에러 메시지는 인라인으로 표시

### 2. 메인 화면 (홈)

#### 2.1 펫 인터랙션 영역

**기능 설명**: 사용자의 픽셀 펫과 상호작용하는 메인 영역

- **UI 요소**:
  - 픽셀 펫 캐릭터 (16x16 ~ 32x32)
  - 펫 상태 바 (배고픔, 행복도, 레벨)
  - 먹이 주기 버튼
  - 펫 정보 패널 (이름, 특성, 성장 단계)
- **UX 인터랙션**:
  - 펫 터치 시 반응 애니메이션
  - 상태에 따른 펫 표정 변화
  - 먹이 주기 시 파티클 효과
  - 레벨업 시 진화 애니메이션

#### 2.2 오늘의 습관 섹션

**기능 설명**: 당일 예정된 습관 목록 및 진행 상황

- **UI 요소**:
  - 습관 카드 리스트
  - 체크박스 (완료/미완료)
  - 진행률 원형 차트
  - 빠른 추가 FAB 버튼
- **UX 플로우**:
  - 스와이프로 습관 완료 처리
  - 길게 누르기로 상세 편집
  - 완료 시 즉시 점수 획득 피드백

#### 2.3 점수 & 통계 요약

**기능 설명**: 현재 점수와 간단한 통계 정보

- **UI 요소**:
  - 총 점수 표시
  - 오늘 획득 점수
  - 연속 달성 일수
  - 주간 진행률 미니 차트
- **UX 특징**:
  - 점수 증가 시 카운트업 애니메이션
  - 연속 달성 시 불꽃 이모지 효과

### 3. 습관 관리

#### 3.1 습관 추가/편집 화면

**기능 설명**: 새로운 습관 생성 및 기존 습관 수정

- **UI 요소**:
  - 습관 제목 입력 필드
  - 카테고리 선택 (운동, 학습, 요리, 음악, 명상)
  - 난이도 슬라이더 (1-5)
  - 목표 빈도 설정 (매일, 주 N회)
  - 알림 시간 설정
  - 이모지 선택기
- **UX 플로우**:
  - 단계별 입력 가이드
  - 실시간 점수 계산 미리보기
  - 저장 전 확인 모달

#### 3.2 습관 상세 화면

**기능 설명**: 개별 습관의 상세 정보 및 기록

- **UI 요소**:
  - 습관 헤더 (제목, 카테고리, 난이도)
  - 달력 뷰 (완료 기록)
  - 통계 차트 (주/월별 달성률)
  - 기록 리스트 (텍스트/음성 메모)
  - 편집/삭제 액션 버튼
- **UX 특징**:
  - 달력에서 완료일은 초록색 표시
  - 연속 달성 구간은 하이라이트
  - 기록 추가 시 음성/텍스트 선택 모달

### 4. 통계 & 분석

#### 4.1 대시보드 화면

**기능 설명**: 전체적인 습관 수행 통계 및 분석

- **UI 요소**:
  - 기간 선택 탭 (주간, 월간, 연간)
  - 전체 달성률 도넛 차트
  - 카테고리별 점수 바 차트
  - 연속 달성 기록 타임라인
  - 펫 성장 히스토리
- **UX 인터랙션**:
  - 차트 터치 시 상세 정보 툴팁
  - 좌우 스와이프로 기간 변경
  - 펫 성장 단계별 이미지 갤러리

#### 4.2 펫 도감 화면

**기능 설명**: 획득한 펫들의 컬렉션 및 정보

- **UI 요소**:
  - 그리드 레이아웃 펫 썸네일
  - 펫 상세 정보 모달
  - 진화 트리 다이어그램
  - 특성별 필터링 옵션
- **UX 특징**:
  - 미획득 펫은 실루엣으로 표시
  - 펫 터치 시 3D 회전 효과
  - 진화 조건 힌트 제공

### 5. 설정 & 프로필

#### 5.1 프로필 화면

**기능 설명**: 사용자 정보 및 계정 관리

- **UI 요소**:
  - 프로필 이미지 (편집 가능)
  - 사용자명 및 이메일
  - 가입일 및 총 사용일
  - 주요 통계 요약
  - 계정 설정 메뉴
- **UX 플로우**:
  - 프로필 이미지 터치로 갤러리/카메라 선택
  - 사용자명 인라인 편집

#### 5.2 설정 화면

**기능 설명**: 앱 환경 설정 및 기본 설정

- **UI 요소**:
  - 알림 설정 토글
  - 테마 선택 (라이트/다크)
  - 언어 설정
  - 데이터 백업/복원
  - 개인정보 처리방침
  - 로그아웃 버튼
- **UX 특징**:
  - 설정 변경 시 즉시 적용
  - 중요한 설정은 확인 다이얼로그

---

## 💻 프론트엔드 기능 명세

### 1. 상태 관리

#### 1.1 전역 상태 구조

```typescript
interface AppState {
  // 사용자 상태
  user: {
    id: string;
    email: string;
    profile: UserProfile;
    subscription: SubscriptionInfo;
  };

  // 펫 상태
  pets: {
    current: Pet;
    collection: Pet[];
    evolution: EvolutionData;
  };

  // 습관 상태
  habits: {
    list: Habit[];
    todayProgress: HabitProgress[];
    statistics: HabitStats;
  };

  // UI 상태
  ui: {
    loading: boolean;
    activeTab: string;
    modals: ModalState;
    notifications: NotificationState;
  };
}
```

#### 1.2 상태 관리 액션

- **사용자 액션**: 로그인, 로그아웃, 프로필 업데이트
- **펫 액션**: 먹이 주기, 진화, 상호작용
- **습관 액션**: 추가, 수정, 삭제, 완료 처리
- **UI 액션**: 로딩 상태, 모달 제어, 알림 관리

### 2. 컴포넌트 아키텍처

#### 2.1 공통 컴포넌트

```typescript
// 기본 UI 컴포넌트
- Button (primary, secondary, ghost variants)
- Input (text, password, search types)
- Card (habit, pet, stat variants)
- Modal (confirm, info, custom types)
- Loading (spinner, skeleton variants)

// 비즈니스 컴포넌트
- HabitCard: 습관 정보 표시 카드
- PetSprite: 픽셀 펫 렌더링 컴포넌트
- ScoreDisplay: 점수 표시 및 애니메이션
- ProgressChart: 진행률 차트 컴포넌트
- VoiceRecorder: 음성 녹음 인터페이스
```

#### 2.2 화면별 컴포넌트 구조

```
screens/
├── auth/
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   └── OnboardingScreen.tsx
├── main/
│   ├── HomeScreen.tsx
│   ├── HabitsScreen.tsx
│   ├── StatsScreen.tsx
│   └── ProfileScreen.tsx
├── habit/
│   ├── HabitDetailScreen.tsx
│   ├── AddHabitScreen.tsx
│   └── EditHabitScreen.tsx
└── pet/
    ├── PetDetailScreen.tsx
    └── PetCollectionScreen.tsx
```

### 3. 데이터 레이어

#### 3.1 API 서비스

```typescript
// Supabase 클라이언트 래퍼
class ApiService {
  // 인증 관련
  async signIn(email: string, password: string): Promise<User>;
  async signUp(email: string, password: string): Promise<User>;
  async signOut(): Promise<void>;

  // 습관 관련
  async getHabits(userId: string): Promise<Habit[]>;
  async createHabit(habit: CreateHabitDto): Promise<Habit>;
  async updateHabit(id: string, updates: UpdateHabitDto): Promise<Habit>;
  async deleteHabit(id: string): Promise<void>;

  // 펫 관련
  async getPet(userId: string): Promise<Pet>;
  async updatePetStatus(petId: string, status: PetStatus): Promise<Pet>;
  async feedPet(petId: string, food: number): Promise<Pet>;

  // 기록 관련
  async createHabitRecord(record: CreateRecordDto): Promise<HabitRecord>;
  async getHabitRecords(habitId: string): Promise<HabitRecord[]>;
}
```

#### 3.2 실시간 데이터 동기화

```typescript
// Supabase Realtime 구독
class RealtimeService {
  // 펫 상태 실시간 업데이트
  subscribeToPetUpdates(petId: string, callback: (pet: Pet) => void);

  // 습관 완료 실시간 알림
  subscribeToHabitUpdates(userId: string, callback: (habit: Habit) => void);

  // 친구 활동 실시간 피드
  subscribeToFriendActivity(
    userId: string,
    callback: (activity: Activity) => void
  );
}
```

### 4. 애니메이션 시스템

#### 4.1 펫 애니메이션

```typescript
// React Native Reanimated 기반 펫 애니메이션
const PetAnimationController = {
  // 기본 애니메이션
  idle: () => breathingAnimation(),
  happy: () => bounceAnimation(),
  eating: () => chewingAnimation(),
  sleeping: () => floatingAnimation(),

  // 진화 애니메이션
  evolve: () => transformAnimation(),
  levelUp: () => sparkleAnimation(),

  // 상호작용 애니메이션
  touch: () => squishAnimation(),
  feed: () => eatAnimation(),
};
```

#### 4.2 UI 트랜지션

```typescript
// 화면 전환 애니메이션
const NavigationAnimations = {
  slideFromRight: { duration: 300, easing: "ease-out" },
  fadeIn: { duration: 200, easing: "ease-in" },
  scaleUp: { duration: 250, easing: "spring" },
};

// 리스트 아이템 애니메이션
const ListAnimations = {
  staggeredFadeIn: (index: number) => ({ delay: index * 100 }),
  swipeToComplete: { translateX: -100, opacity: 0.5 },
};
```

### 5. 오프라인 지원

#### 5.1 로컬 스토리지

```typescript
// AsyncStorage 기반 오프라인 데이터
class OfflineStorage {
  // 습관 데이터 캐싱
  async cacheHabits(habits: Habit[]): Promise<void>;
  async getCachedHabits(): Promise<Habit[]>;

  // 펫 상태 캐싱
  async cachePetState(pet: Pet): Promise<void>;
  async getCachedPetState(): Promise<Pet>;

  // 오프라인 액션 큐
  async queueOfflineAction(action: OfflineAction): Promise<void>;
  async syncOfflineActions(): Promise<void>;
}
```

#### 5.2 네트워크 상태 관리

```typescript
// 네트워크 연결 상태 감지
const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [syncPending, setSyncPending] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
      if (state.isConnected && syncPending) {
        syncOfflineData();
      }
    });
    return unsubscribe;
  }, []);

  return { isOnline, syncPending };
};
```

---

## 🗄️ 백엔드 기능 명세 (Supabase)

### 1. 데이터베이스 스키마

#### 1.1 사용자 관리

```sql
-- 사용자 프로필 테이블
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_type TEXT DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE
);

-- RLS 정책
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### 1.2 습관 관리

```sql
-- 습관 테이블
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('exercise', 'study', 'cooking', 'music', 'meditation', 'other')),
  difficulty INTEGER DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
  target_frequency INTEGER DEFAULT 1, -- 주당 목표 횟수
  points_per_completion INTEGER DEFAULT 10,
  emoji TEXT DEFAULT '⭐',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 습관 기록 테이블
CREATE TABLE habit_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  note TEXT,
  voice_note_url TEXT,
  mood_emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_records_habit_id ON habit_records(habit_id);
CREATE INDEX idx_habit_records_completed_at ON habit_records(completed_at);
```

#### 1.3 펫 시스템

```sql
-- 펫 테이블
CREATE TABLE pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Pet',
  pet_type TEXT NOT NULL CHECK (pet_type IN ('cat', 'dog', 'rabbit')),
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  hunger INTEGER DEFAULT 50 CHECK (hunger >= 0 AND hunger <= 100),
  happiness INTEGER DEFAULT 50 CHECK (happiness >= 0 AND happiness <= 100),
  evolution_stage INTEGER DEFAULT 1 CHECK (evolution_stage >= 1 AND evolution_stage <= 5),
  primary_trait TEXT, -- 주요 특성 (exercise, study, cooking, music, meditation)
  secondary_trait TEXT, -- 부차 특성
  trait_points JSONB DEFAULT '{}', -- 특성별 포인트 저장
  last_fed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 펫 진화 히스토리
CREATE TABLE pet_evolution_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  from_stage INTEGER NOT NULL,
  to_stage INTEGER NOT NULL,
  evolved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trigger_trait TEXT NOT NULL
);
```

#### 1.4 점수 및 통계

```sql
-- 사용자 점수 테이블
CREATE TABLE user_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  daily_points INTEGER DEFAULT 0,
  weekly_points INTEGER DEFAULT 0,
  monthly_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 일일 통계 테이블
CREATE TABLE daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  habits_completed INTEGER DEFAULT 0,
  total_habits INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  category_breakdown JSONB DEFAULT '{}', -- 카테고리별 완료 수
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

### 2. Supabase Functions

#### 2.1 펫 먹이 주기 함수

```sql
CREATE OR REPLACE FUNCTION feed_pet(pet_id UUID, food_amount INTEGER)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  pet_record pets%ROWTYPE;
  new_hunger INTEGER;
  new_happiness INTEGER;
  level_up BOOLEAN := false;
BEGIN
  -- 펫 정보 조회
  SELECT * INTO pet_record FROM pets WHERE id = pet_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pet not found';
  END IF;

  -- 배고픔과 행복도 계산
  new_hunger := LEAST(pet_record.hunger + food_amount, 100);
  new_happiness := LEAST(pet_record.happiness + (food_amount / 2), 100);

  -- 경험치 증가 (먹이 양에 비례)
  UPDATE pets
  SET
    hunger = new_hunger,
    happiness = new_happiness,
    experience = experience + food_amount,
    last_fed_at = NOW(),
    updated_at = NOW()
  WHERE id = pet_id;

  -- 레벨업 체크
  IF (pet_record.experience + food_amount) >= (pet_record.level * 100) THEN
    UPDATE pets SET level = level + 1 WHERE id = pet_id;
    level_up := true;
  END IF;

  RETURN json_build_object(
    'success', true,
    'new_hunger', new_hunger,
    'new_happiness', new_happiness,
    'level_up', level_up
  );
END;
$$;
```

#### 2.2 습관 완료 처리 함수

```sql
CREATE OR REPLACE FUNCTION complete_habit(
  habit_id UUID,
  user_id UUID,
  note TEXT DEFAULT NULL,
  mood_emoji TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  habit_record habits%ROWTYPE;
  points_earned INTEGER;
  streak_bonus INTEGER := 0;
  current_streak INTEGER;
BEGIN
  -- 습관 정보 조회
  SELECT * INTO habit_record FROM habits WHERE id = habit_id AND user_id = user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Habit not found';
  END IF;

  -- 기본 점수 계산
  points_earned := habit_record.points_per_completion * habit_record.difficulty;

  -- 연속 달성 보너스 계산
  SELECT streak_days INTO current_streak FROM user_scores WHERE user_id = user_id;
  IF current_streak > 0 THEN
    streak_bonus := LEAST(current_streak * 2, 50); -- 최대 50점 보너스
    points_earned := points_earned + streak_bonus;
  END IF;

  -- 습관 기록 생성
  INSERT INTO habit_records (habit_id, user_id, points_earned, note, mood_emoji)
  VALUES (habit_id, user_id, points_earned, note, mood_emoji);

  -- 사용자 점수 업데이트
  UPDATE user_scores
  SET
    total_points = total_points + points_earned,
    daily_points = daily_points + points_earned,
    updated_at = NOW()
  WHERE user_id = user_id;

  -- 펫에게 먹이 제공 (점수의 10%를 먹이로 변환)
  PERFORM feed_pet(
    (SELECT id FROM pets WHERE user_id = user_id LIMIT 1),
    points_earned / 10
  );

  RETURN json_build_object(
    'success', true,
    'points_earned', points_earned,
    'streak_bonus', streak_bonus
  );
END;
$$;
```

#### 2.3 펫 진화 체크 함수

```sql
CREATE OR REPLACE FUNCTION check_pet_evolution(pet_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  pet_record pets%ROWTYPE;
  trait_stats JSONB;
  dominant_trait TEXT;
  max_trait_points INTEGER := 0;
  evolution_threshold INTEGER;
  should_evolve BOOLEAN := false;
BEGIN
  SELECT * INTO pet_record FROM pets WHERE id = pet_id;

  -- 특성별 포인트 계산
  SELECT
    json_build_object(
      'exercise', COALESCE(SUM(CASE WHEN h.category = 'exercise' THEN hr.points_earned ELSE 0 END), 0),
      'study', COALESCE(SUM(CASE WHEN h.category = 'study' THEN hr.points_earned ELSE 0 END), 0),
      'cooking', COALESCE(SUM(CASE WHEN h.category = 'cooking' THEN hr.points_earned ELSE 0 END), 0),
      'music', COALESCE(SUM(CASE WHEN h.category = 'music' THEN hr.points_earned ELSE 0 END), 0),
      'meditation', COALESCE(SUM(CASE WHEN h.category = 'meditation' THEN hr.points_earned ELSE 0 END), 0)
    )
  INTO trait_stats
  FROM habit_records hr
  JOIN habits h ON hr.habit_id = h.id
  WHERE hr.user_id = pet_record.user_id;

  -- 가장 높은 특성 찾기
  FOR trait_name, trait_points IN SELECT * FROM jsonb_each_text(trait_stats) LOOP
    IF trait_points::INTEGER > max_trait_points THEN
      max_trait_points := trait_points::INTEGER;
      dominant_trait := trait_name;
    END IF;
  END LOOP;

  -- 진화 조건 체크
  evolution_threshold := pet_record.evolution_stage * 200; -- 단계별 필요 포인트

  IF max_trait_points >= evolution_threshold AND pet_record.evolution_stage < 5 THEN
    should_evolve := true;

    -- 펫 진화 실행
    UPDATE pets
    SET
      evolution_stage = evolution_stage + 1,
      primary_trait = dominant_trait,
      trait_points = trait_stats,
      updated_at = NOW()
    WHERE id = pet_id;

    -- 진화 히스토리 기록
    INSERT INTO pet_evolution_history (pet_id, from_stage, to_stage, trigger_trait)
    VALUES (pet_id, pet_record.evolution_stage, pet_record.evolution_stage + 1, dominant_trait);
  END IF;

  RETURN json_build_object(
    'should_evolve', should_evolve,
    'dominant_trait', dominant_trait,
    'trait_points', trait_stats,
    'evolution_threshold', evolution_threshold
  );
END;
$$;
```

### 3. Realtime 구독

#### 3.1 펫 상태 실시간 업데이트

```typescript
// 클라이언트에서 펫 상태 구독
const subscribeToPetUpdates = (petId: string) => {
  return supabase
    .channel(`pet-${petId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "pets",
        filter: `id=eq.${petId}`,
      },
      (payload) => {
        // 펫 상태 업데이트 처리
        updatePetState(payload.new);
      }
    )
    .subscribe();
};
```

#### 3.2 습관 완료 실시간 알림

```typescript
// 습관 완료 시 실시간 알림
const subscribeToHabitUpdates = (userId: string) => {
  return supabase
    .channel(`user-habits-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "habit_records",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        // 습관 완료 알림 처리
        showHabitCompletionNotification(payload.new);
      }
    )
    .subscribe();
};
```

### 4. Storage 관리

#### 4.1 음성 메모 저장

```typescript
// 음성 파일 업로드
const uploadVoiceNote = async (audioUri: string, userId: string) => {
  const fileName = `voice-notes/${userId}/${Date.now()}.m4a`;

  const { data, error } = await supabase.storage
    .from("habit-records")
    .upload(fileName, {
      uri: audioUri,
      type: "audio/m4a",
      name: fileName,
    });

  if (error) throw error;

  // 공개 URL 생성
  const { data: publicUrl } = supabase.storage
    .from("habit-records")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};
```

#### 4.2 펫 이미지 캐싱

```typescript
// 펫 스프라이트 이미지 관리
const getPetSpriteUrl = (petType: string, stage: number, animation: string) => {
  const fileName = `pets/${petType}/stage${stage}/${animation}.png`;

  const { data } = supabase.storage.from("pet-sprites").getPublicUrl(fileName);

  return data.publicUrl;
};
```

### 5. 보안 및 RLS 정책

#### 5.1 Row Level Security 정책

```sql
-- 습관 테이블 RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own habits" ON habits
  USING (auth.uid() = user_id);

-- 펫 테이블 RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own pets" ON pets
  USING (auth.uid() = user_id);

-- 습관 기록 RLS
ALTER TABLE habit_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own habit records" ON habit_records
  USING (auth.uid() = user_id);
```

#### 5.2 API 보안

```typescript
// JWT 토큰 검증 미들웨어
const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token validation failed" });
  }
};
```

---

## 🔧 개발 환경 설정

### 1. 프로젝트 구조

```
habitpet/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── screens/            # 화면 컴포넌트
│   ├── services/           # API 및 외부 서비스
│   ├── store/              # 상태 관리
│   ├── utils/              # 유틸리티 함수
│   ├── types/              # TypeScript 타입 정의
│   └── constants/          # 상수 정의
├── assets/                 # 이미지, 폰트 등 정적 자원
├── supabase/              # Supabase 설정 및 마이그레이션
└── docs/                  # 문서
```

### 2. 환경 변수

```env
# Supabase 설정
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 기타 설정
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_BASE_URL=https://api.habitpet.com
```

### 3. 패키지 의존성

```json
{
  "dependencies": {
    "expo": "~49.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "react-native-reanimated": "~3.3.0",
    "zustand": "^4.4.0",
    "@react-navigation/native": "^6.1.0",
    "expo-av": "~13.4.0",
    "expo-notifications": "~0.20.0"
  }
}
```

---

## 📝 개발 우선순위

### Phase 1 (4주) - 핵심 기능

1. 사용자 인증 및 온보딩
2. 기본 습관 CRUD
3. 픽셀 펫 시스템 (기본 상태)
4. 점수 계산 및 먹이 주기

### Phase 2 (4주) - 고급 기능

1. 펫 진화 시스템
2. 음성 메모 기능
3. 통계 대시보드
4. 푸시 알림

### Phase 3 (4주) - 완성도 향상

1. 애니메이션 및 인터랙션
2. 오프라인 지원
3. 성능 최적화
4. 테스트 및 버그 수정

---

_작성일: 2025년 7월 16일_
_버전: 1.0.0_
_작성자: HabitPet Development Team_
