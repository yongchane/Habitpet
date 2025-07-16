# HabitPet 🐾

> **습관 형성과 펫 키우기가 결합된 게이미피케이션 라이프스타일 앱**

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.51.0-green.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 프로젝트 개요

HabitPet은 일상 습관 관리를 게임처럼 재미있게 만드는 혁신적인 앱입니다. 사용자의 습관 패턴에 따라 성장하는 픽셀 펫을 키우며, 지속 가능한 습관 형성을 도와줍니다.

### 🎯 핵심 특징

- **🎮 픽셀 펫 개성화**: 사용자 습관에 따른 펫의 독특한 성장과 외형 변화
- **🎤 음성 기록**: 간편한 음성 입력으로 습관 기록
- **🤖 AI 개인화**: 개인 패턴 분석 및 맞춤형 조언
- **⚡ 실시간 동기화**: Supabase 기반 실시간 데이터 업데이트
- **📱 오프라인 지원**: 네트워크 연결 없이도 습관 기록 가능

### 🎨 펫 진화 시스템

사용자의 주요 습관 카테고리에 따라 펫이 독특하게 성장합니다:

| 습관 카테고리 | 펫 진화 타입 | 특징                   |
| ------------- | ------------ | ---------------------- |
| 🏋️ 운동       | 머슬 펫      | 벌크업, 운동 도구 착용 |
| 📚 학습       | 학자 펫      | 안경, 책, 졸업모자     |
| 🍳 요리       | 셰프 펫      | 요리사 모자, 앞치마    |
| 🎵 음악       | 뮤지션 펫    | 악기, 헤드폰           |
| 🧘 명상       | 선사 펫      | 평화로운 표정, 연꽃    |

---

## 🛠️ 기술 스택

### Frontend

- **React Native** 0.79.5 - 크로스 플랫폼 모바일 앱
- **Expo** 53.0 - 개발 도구 및 빌드 플랫폼
- **TypeScript** 5.8.3 - 타입 안전성
- **Zustand** 5.0.6 - 상태 관리
- **React Navigation** 7.x - 네비게이션
- **React Native Reanimated** 3.x - 고성능 애니메이션

### Backend

- **Supabase** 2.51.0 - Backend as a Service
  - PostgreSQL 데이터베이스
  - 실시간 구독 (Realtime)
  - 인증 시스템 (Auth)
  - 파일 저장소 (Storage)
  - Edge Functions

### 개발 도구

- **Expo Dev Tools** - 개발 환경
- **EAS Build** - 빌드 시스템
- **Expo Notifications** - 푸시 알림
- **Expo AV** - 오디오/비디오 처리

---

## 📱 주요 기능

### 1. 습관 관리 시스템

- ✅ 텍스트/음성 입력 지원
- 📊 카테고리별 습관 분류
- 🎯 난이도별 점수 시스템
- 📈 연속 달성 보너스

### 2. 픽셀 펫 시스템

- 🐱 기본 펫 선택 (고양이/강아지/토끼)
- 🎮 점수-먹이 변환 시스템
- 🔄 5단계 진화 (새끼 → 마스터)
- 🎨 특성 기반 개성화

### 3. 통계 & 분석

- 📊 일/주/월별 달성률
- 🔥 연속 달성 기록
- 📈 카테고리별 성과 분석
- 🏆 펫 성장 히스토리

### 4. 소셜 기능 (예정)

- 👥 친구 추가 및 펫 교류
- 🏁 그룹 챌린지
- 🎪 펫 자랑하기
- 🥊 펫 배틀 시스템

---

## 🚀 설치 및 실행

### 전제 조건

- Node.js 18.x 이상
- npm 또는 yarn
- Expo CLI
- iOS Simulator (macOS) 또는 Android Emulator

### 1. 프로젝트 클론

```bash
git clone https://github.com/yongchane/Habitpet.git
cd Habitpet/habitpet-mobile
```

### 2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행

```bash
npm start
# 또는
yarn start
```

### 5. 앱 실행

- iOS: `i` 키를 눌러 iOS 시뮬레이터에서 실행
- Android: `a` 키를 눌러 Android 에뮬레이터에서 실행
- 실제 기기: Expo Go 앱을 사용하여 QR 코드 스캔

---

## 📁 프로젝트 구조

```
habitpet-mobile/
├── src/
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── habit/          # 습관 관련 컴포넌트
│   │   └── pet/            # 펫 관련 컴포넌트
│   ├── screens/            # 화면 컴포넌트
│   │   ├── auth/           # 인증 관련 화면
│   │   ├── main/           # 메인 화면들
│   │   ├── habit/          # 습관 관리 화면
│   │   └── pet/            # 펫 관련 화면
│   ├── navigation/         # 네비게이션 설정
│   ├── services/           # API 및 비즈니스 로직
│   │   ├── api/            # API 서비스
│   │   └── supabase.ts     # Supabase 클라이언트
│   ├── store/              # 상태 관리 (Zustand)
│   ├── types/              # TypeScript 타입 정의
│   ├── constants/          # 앱 상수
│   └── utils/              # 유틸리티 함수
├── assets/                 # 이미지, 폰트, 사운드
├── app.json               # Expo 설정
├── package.json           # 의존성 관리
└── tsconfig.json          # TypeScript 설정
```

---

## 🗄️ 데이터베이스 스키마

### 주요 테이블

#### 📊 habits (습관)

```sql
CREATE TABLE habits (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
  points_per_completion INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 🐾 pets (펫)

```sql
CREATE TABLE pets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  pet_type TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  hunger INTEGER DEFAULT 50,
  happiness INTEGER DEFAULT 50,
  evolution_stage INTEGER DEFAULT 1,
  primary_trait TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 📝 habit_records (습관 기록)

```sql
CREATE TABLE habit_records (
  id UUID PRIMARY KEY,
  habit_id UUID REFERENCES habits(id),
  user_id UUID REFERENCES profiles(id),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  note TEXT,
  voice_note_url TEXT
);
```

---

## 🔧 개발 가이드

### 코드 컨벤션

- **언어**: TypeScript 사용 필수
- **스타일**: ESLint + Prettier 설정 준수
- **컴포넌트**: 함수형 컴포넌트 + Hooks 사용
- **네이밍**: camelCase (변수/함수), PascalCase (컴포넌트)

### 상태 관리 패턴

```typescript
// Zustand 스토어 예시
interface AppState {
  user: User | null;
  pets: {
    current: Pet | null;
    collection: Pet[];
  };
  habits: {
    list: Habit[];
    todayProgress: HabitProgress[];
  };
}

// 액션과 함께 스토어 생성
export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // ... 기타 액션들
}));
```

### 컴포넌트 작성 예시

```typescript
interface HabitCardProps {
  habit: Habit;
  onComplete: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onComplete,
  onEdit,
}) => {
  const handleComplete = () => {
    onComplete(habit.id);
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{habit.title}</Text>
      <Button onPress={handleComplete} title="완료" />
    </Card>
  );
};
```

### API 호출 패턴

```typescript
// services/api/habitService.ts
export const habitService = {
  async getHabits(userId: string): Promise<Habit[]> {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  },

  async createHabit(habit: CreateHabitDto): Promise<Habit> {
    const { data, error } = await supabase
      .from("habits")
      .insert(habit)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
```

---

## 🧪 테스트

### 테스트 실행

```bash
# 단위 테스트
npm test

# 통합 테스트
npm run test:integration

# E2E 테스트
npm run test:e2e
```

### 테스트 커버리지

```bash
npm run test:coverage
```

---

## 📦 빌드 및 배포

### 개발 빌드

```bash
# iOS 개발 빌드
eas build --platform ios --profile development

# Android 개발 빌드
eas build --platform android --profile development
```

### 프로덕션 빌드

```bash
# 모든 플랫폼 프로덕션 빌드
eas build --platform all --profile production
```

### 앱스토어 배포

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

---

## 🎯 로드맵

### Phase 1: MVP (완료)

- ✅ 사용자 인증 및 온보딩
- ✅ 기본 습관 관리 시스템
- ✅ 픽셀 펫 기본 시스템
- ✅ 점수 계산 및 먹이 주기

### Phase 2: 고급 기능 (진행 중)

- 🔄 펫 진화 시스템
- 🔄 음성 메모 기능
- 🔄 통계 대시보드
- 🔄 푸시 알림 시스템

### Phase 3: 소셜 기능 (예정)

- 🔲 친구 추가 및 펫 교류
- 🔲 그룹 챌린지
- 🔲 펫 배틀 시스템
- 🔲 커뮤니티 기능

### Phase 4: 고급 기능 (예정)

- 🔲 AR 펫 상호작용
- 🔲 웨어러블 기기 연동
- 🔲 AI 개인화 코칭
- 🔲 글로벌 출시

---

## 🤝 기여하기

HabitPet 프로젝트에 기여해주시는 모든 분들을 환영합니다!

### 기여 방법

1. 프로젝트를 Fork 합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 이슈 신고

버그 발견이나 기능 제안은 [GitHub Issues](https://github.com/yongchane/Habitpet/issues)에 등록해주세요.

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👨‍💻 개발팀

| 역할               | 이름   | 연락처                                     |
| ------------------ | ------ | ------------------------------------------ |
| Frontend Developer | 현용찬 | [@yongchane](https://github.com/yongchane) |
| Backend Developer  | 현용찬 |
| UI/UX Designer     | 현용찬 |

---

<div align="center">
  <p>
    <sub>습관을 기르고, 펫을 키우고, 함께 성장해요! 🐾</sub>
  </p>
  <p>
    <sub>Made with ❤️ by HabitPet Team</sub>
  </p>
</div>
