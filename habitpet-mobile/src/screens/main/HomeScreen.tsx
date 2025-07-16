import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Pet, HabitProgress, UserScore } from '../../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants';
import { PetSprite, PetStatusBar } from '../../components/pet';
import { HabitCard } from '../../components/habit';
import { Card, Button } from '../../components/common';

// 임시 데이터 (실제로는 store에서 가져옴)
const mockPet: Pet = {
  id: '1',
  user_id: '1',
  name: '레오',
  pet_type: 'cat',
  level: 12,
  experience: 45,
  hunger: 80,
  happiness: 100,
  evolution_stage: 3,
  primary_trait: 'exercise',
  secondary_trait: undefined,
  trait_points: {
    exercise: 450,
    study: 120,
    cooking: 80,
    music: 60,
    meditation: 90,
  },
  last_fed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockHabits: HabitProgress[] = [
  {
    habit: {
      id: '1',
      user_id: '1',
      title: '30분 운동하기',
      description: '유산소 운동 또는 근력운동',
      category: 'exercise',
      difficulty: 3,
      target_frequency: 5,
      points_per_completion: 10,
      emoji: '🏃‍♂️',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    completed: false,
  },
  {
    habit: {
      id: '2',
      user_id: '1',
      title: '책 30페이지 읽기',
      description: '자기계발서 또는 소설',
      category: 'study',
      difficulty: 2,
      target_frequency: 7,
      points_per_completion: 10,
      emoji: '📚',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    completed: true,
    completedAt: new Date().toISOString(),
    pointsEarned: 20,
  },
  {
    habit: {
      id: '3',
      user_id: '1',
      title: '물 8잔 마시기',
      description: '하루 권장 수분 섭취',
      category: 'other',
      difficulty: 1,
      target_frequency: 7,
      points_per_completion: 10,
      emoji: '💧',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    completed: false,
  },
];

const HomeScreen: React.FC = () => {
  const [pet, setPet] = useState<Pet>(mockPet);
  const [todayHabits, setTodayHabits] = useState<HabitProgress[]>(mockHabits);
  const [todayScore, setTodayScore] = useState(1248);

  const completedHabits = todayHabits.filter(h => h.completed).length;
  const totalHabits = todayHabits.length;
  const progressPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  const handleCompleteHabit = (habitId: string) => {
    setTodayHabits(prev => 
      prev.map(habitProgress => 
        habitProgress.habit.id === habitId 
          ? { 
              ...habitProgress, 
              completed: true,
              completedAt: new Date().toISOString(),
              pointsEarned: habitProgress.habit.points_per_completion * habitProgress.habit.difficulty
            }
          : habitProgress
      )
    );
    
    // 점수 업데이트
    const habit = todayHabits.find(h => h.habit.id === habitId)?.habit;
    if (habit) {
      const points = habit.points_per_completion * habit.difficulty;
      setTodayScore(prev => prev + points);
      
      // 펫 먹이주기 (점수의 10%를 배고픔으로 변환)
      const foodAmount = Math.floor(points * 0.1);
      setPet(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + foodAmount),
        happiness: Math.min(100, prev.happiness + Math.floor(foodAmount / 2)),
      }));
    }
  };

  const handlePetTouch = () => {
    // 펫 터치 시 행복도 약간 증가
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 2),
    }));
  };

  const getCurrentDate = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[now.getDay()];
    return `${month}월 ${day}일 (${dayName})`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.dateText}>☀️ {getCurrentDate()}</Text>
          <View style={styles.headerRight}>
            <Text style={styles.scoreText}>💰 {todayScore.toLocaleString()}P</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 펫 홈 섹션 */}
        <Card variant="pet" style={styles.petHomeCard}>
          <Text style={styles.sectionTitle}>🏠 내 펫의 집</Text>
          
          <View style={styles.petHomeContainer}>
            <View style={styles.petRoom}>
              {/* 배경 요소들 */}
              <Text style={styles.roomDecoration}>🪟</Text>
              <Text style={styles.roomDecoration}>☁️</Text>
              <Text style={styles.roomDecoration}>🌱</Text>
              <Text style={styles.roomDecoration}>🛏️</Text>
              <Text style={styles.roomDecoration}>📚</Text>
              <Text style={styles.roomDecoration}>🪑</Text>
              <Text style={styles.roomDecoration}>🧸</Text>
              <Text style={styles.roomDecoration}>🥛</Text>
              <Text style={styles.roomDecoration}>🎵</Text>
              <Text style={styles.roomDecoration}>💡</Text>
              
              {/* 펫 스프라이트 */}
              <View style={styles.petSpriteContainer}>
                <PetSprite
                  pet={pet}
                  onTouch={handlePetTouch}
                  style={styles.petSprite}
                />
              </View>
            </View>
            
            <PetStatusBar pet={pet} style={styles.petStatusBar} />
          </View>
        </Card>

        {/* 먹이주기 섹션 */}
        <Card variant="stat" style={styles.feedingCard}>
          <Text style={styles.sectionTitle}>🍯 먹이주기</Text>
          
          <View style={styles.habitsContainer}>
            {todayHabits.map(habitProgress => (
              <HabitCard
                key={habitProgress.habit.id}
                habitProgress={habitProgress}
                onComplete={handleCompleteHabit}
                style={styles.habitCard}
              />
            ))}
          </View>
          
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              오늘 진행률: {Math.round(progressPercentage)}% ({completedHabits}/{totalHabits})
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progressPercentage}%` }
                ]}
              />
            </View>
          </View>
          
          <Button
            title="+ 습관 추가하기"
            onPress={() => console.log('습관 추가')}
            variant="ghost"
            style={styles.addHabitButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  
  scrollView: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
  },
  
  dateText: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  
  scoreText: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  
  settingsButton: {
    padding: SPACING.XS,
  },
  
  settingsIcon: {
    fontSize: 20,
  },
  
  petHomeCard: {
    margin: SPACING.MD,
    marginBottom: SPACING.SM,
  },
  
  feedingCard: {
    margin: SPACING.MD,
    marginTop: SPACING.SM,
  },
  
  sectionTitle: {
    fontSize: FONT_SIZES.SUBTITLE,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  
  petHomeContainer: {
    gap: SPACING.MD,
  },
  
  petRoom: {
    height: 200,
    backgroundColor: COLORS.PET_HOME_BACKGROUND,
    borderRadius: BORDER_RADIUS.MD,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  roomDecoration: {
    position: 'absolute',
    fontSize: 16,
  },
  
  petSpriteContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  petSprite: {
    // 펫 스프라이트 스타일
  },
  
  petStatusBar: {
    // 펫 상태 바 스타일
  },
  
  habitsContainer: {
    gap: SPACING.XS,
    marginBottom: SPACING.MD,
  },
  
  habitCard: {
    // 습관 카드 스타일
  },
  
  progressContainer: {
    marginBottom: SPACING.MD,
  },
  
  progressText: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
    textAlign: 'center',
  },
  
  progressBar: {
    height: 8,
    backgroundColor: COLORS.TEXT_DISABLED,
    borderRadius: 4,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },
  
  addHabitButton: {
    alignSelf: 'center',
  },
});

export default HomeScreen;