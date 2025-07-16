# HabitPet 모바일 앱 설계

## 개요

HabitPet은 React Native + Expo + Supabase 기반의 크로스 플랫폼 모바일 앱입니다. 픽셀 펫 개성화 시스템을 통해 사용자의 습관 형성을 게이미피케이션으로 지원합니다.

## 아키텍처

### 전체 시스템 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │    Supabase     │    │   Push Service  │
│   + Expo App    │◄──►│   Backend       │◄──►│   (Expo Push)   │
│                 │    │                 │    │                 │
│ • UI Components │    │ • PostgreSQL    │    │ • Notifications │
│ • State Mgmt    │    │ • Realtime      │    │ • Reminders     │
│ • Animations    │    │ • Auth          │    │                 │
│ • Local Storage │    │ • Storage       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 기술 스택

- **Frontend**: React Native 0.72 + Expo SDK 49
- **언어**: TypeScript
- **상태관리**: Zustand
- **애니메이션**: React Native Reanimated 3
- **네비게이션**: React Navigation 6
- **Backend**: Supabase (PostgreSQL + Realtime + Auth + Storage)
- **알림**: Expo Notifications

## 컴포넌트 및 인터페이스

### 핵심 컴포넌트 구조

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── pet/
│   │   ├── PetSprite.tsx
│   │   ├── PetStatusBar.tsx
│   │   ├── PetInteraction.tsx
│   │   └── PetEvolution.tsx
│   ├── habit/
│   │   ├── HabitCard.tsx
│   │   ├── HabitForm.tsx
│   │   └── HabitCalendar.tsx
│   └── stats/
│       ├── ProgressChart.tsx
│       ├── DonutChart.tsx
│       └── BarChart.tsx
├── screens/
│   ├── auth/
│   ├── main/
│   ├── habit/
│   └── stats/
├── services/
│   ├── supabase.ts
│   ├── storage.ts
│   └── notifications.ts
├── store/
│   ├── userStore.ts
│   ├── petStore.ts
│   └── habitStore.ts
└── utils/
    ├── animations.ts
    ├── calculations.ts
    └── constants.ts
```

### 주요 인터페이스

```typescript
// 펫 데이터 모델
interface Pet {
  id: string;
  userId: string;
  name: string;
  type: "cat" | "dog" | "rabbit";
  level: number;
  experience: number;
  hunger: number; // 0-100
  happiness: number; // 0-100
  evolutionStage: 1 | 2 | 3 | 4 | 5;
  primaryTrait?: "exercise" | "study" | "cooking" | "music" | "meditation";
  secondaryTrait?: string;
  traitPoints: Record<string, number>;
  lastFedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 습관 데이터 모델
interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: "exercise" | "study" | "cooking" | "music" | "meditation" | "other";
  difficulty: 1 | 2 | 3 | 4 | 5;
  targetFrequency: number; // 주당 목표 횟수
  pointsPerCompletion: number;
  emoji: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 습관 기록 모델
interface HabitRecord {
  id: string;
  habitId: string;
  userId: string;
  completedAt: Date;
  pointsEarned: number;
  note?: string;
  voiceNoteUrl?: string;
  moodEmoji?: string;
  createdAt: Date;
}
```

## 데이터 모델

### Supabase 데이터베이스 스키마

```sql
-- 사용자 프로필
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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
  primary_trait TEXT,
  secondary_trait TEXT,
  trait_points JSONB DEFAULT '{}',
  last_fed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 습관 테이블
CREATE TABLE habits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
  target_frequency INTEGER DEFAULT 1,
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
```

## 에러 처리

### 에러 처리 전략

1. **네트워크 에러**: 자동 재시도 + 오프라인 큐
2. **인증 에러**: 자동 토큰 갱신 + 로그인 리다이렉트
3. **데이터 에러**: 사용자 친화적 메시지 + 로그 수집
4. **앱 크래시**: Sentry 통합 + 자동 리포팅

### 에러 처리 구현

```typescript
// 글로벌 에러 핸들러
class ErrorHandler {
  static handle(error: Error, context: string) {
    console.error(`[${context}]`, error);

    if (error.name === "NetworkError") {
      // 오프라인 큐에 추가
      OfflineQueue.add(context, error);
    } else if (error.name === "AuthError") {
      // 로그인 화면으로 리다이렉트
      NavigationService.navigate("Login");
    } else {
      // 사용자에게 알림
      Alert.alert("오류", "잠시 후 다시 시도해주세요.");
    }
  }
}
```

## 테스트 전략

### 테스트 계층

1. **Unit Tests**: 유틸리티 함수, 계산 로직
2. **Component Tests**: React Native Testing Library
3. **Integration Tests**: API 연동, 상태 관리
4. **E2E Tests**: Detox (iOS/Android)

### 테스트 구조

```
__tests__/
├── components/
│   ├── PetSprite.test.tsx
│   ├── HabitCard.test.tsx
│   └── ProgressChart.test.tsx
├── services/
│   ├── supabase.test.ts
│   └── calculations.test.ts
├── stores/
│   ├── petStore.test.ts
│   └── habitStore.test.ts
└── e2e/
    ├── onboarding.e2e.ts
    ├── habitFlow.e2e.ts
    └── petInteraction.e2e.ts
```

## 성능 최적화

### 최적화 전략

1. **이미지 최적화**: WebP 포맷, 적절한 해상도
2. **애니메이션 최적화**: useNativeDriver 활용
3. **메모리 관리**: 이미지 캐싱, 컴포넌트 언마운트 시 정리
4. **번들 최적화**: 코드 스플리팅, 트리 쉐이킹

### 성능 모니터링

```typescript
// 성능 메트릭 수집
class PerformanceMonitor {
  static trackScreenLoad(screenName: string) {
    const startTime = Date.now();

    return () => {
      const loadTime = Date.now() - startTime;
      Analytics.track("screen_load_time", {
        screen: screenName,
        duration: loadTime,
      });
    };
  }

  static trackAnimation(animationName: string) {
    // 애니메이션 성능 추적
  }
}
```

## 보안 고려사항

### 보안 조치

1. **데이터 암호화**: 민감한 로컬 데이터 암호화
2. **API 보안**: JWT 토큰, HTTPS 통신
3. **입력 검증**: 클라이언트/서버 양쪽 검증
4. **권한 관리**: 최소 권한 원칙

### 보안 구현

```typescript
// 보안 유틸리티
class SecurityUtils {
  static encryptSensitiveData(data: string): string {
    // 민감한 데이터 암호화
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }

  static validateInput(input: string, type: "email" | "text"): boolean {
    // 입력 검증
    const patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      text: /^[a-zA-Z0-9\s가-힣]{1,100}$/,
    };
    return patterns[type].test(input);
  }
}
```

## 배포 및 CI/CD

### 배포 전략

1. **개발 환경**: Expo Development Build
2. **스테이징**: TestFlight (iOS) + Internal Testing (Android)
3. **프로덕션**: App Store + Google Play Store
4. **OTA 업데이트**: Expo Updates

### CI/CD 파이프라인

```yaml
# .github/workflows/deploy.yml
name: Deploy HabitPet
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
      - run: expo build:android
      - run: expo build:ios
```
