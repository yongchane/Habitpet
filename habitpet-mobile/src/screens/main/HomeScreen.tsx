import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Pet, HabitProgress, UserScore } from '../../types';
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
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View className="flex-row justify-between items-center px-md py-sm">
          <Text className="text-base text-text-primary font-medium">☀️ {getCurrentDate()}</Text>
          <View className="flex-row items-center gap-sm">
            <Text className="text-base text-text-primary font-semibold">💰 {todayScore.toLocaleString()}P</Text>
            <TouchableOpacity className="p-xs">
              <Text className="text-xl">⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 펫 홈 섹션 */}
        <Card variant="pet" className="mx-md mb-sm">
          <Text className="text-lg font-semibold text-text-primary mb-md text-center">🏠 내 펫의 집</Text>
          
          <View className="gap-md">
            <View className="h-[200px] bg-pet-home-background rounded-md relative justify-center items-center">
              {/* 배경 요소들 */}
              <Text className="absolute text-base">🪟</Text>
              <Text className="absolute text-base">☁️</Text>
              <Text className="absolute text-base">🌱</Text>
              <Text className="absolute text-base">🛏️</Text>
              <Text className="absolute text-base">📚</Text>
              <Text className="absolute text-base">🪑</Text>
              <Text className="absolute text-base">🧸</Text>
              <Text className="absolute text-base">🥛</Text>
              <Text className="absolute text-base">🎵</Text>
              <Text className="absolute text-base">💡</Text>
              
              {/* 펫 스프라이트 */}
              <View className="absolute justify-center items-center">
                <PetSprite
                  pet={pet}
                  onTouch={handlePetTouch}
                  className=""
                />
              </View>
            </View>
            
            <PetStatusBar pet={pet} className="" />
          </View>
        </Card>

        {/* 먹이주기 섹션 */}
        <Card variant="stat" className="mx-md mt-sm">
          <Text className="text-lg font-semibold text-text-primary mb-md text-center">🍯 먹이주기</Text>
          
          <View className="gap-xs mb-md">
            {todayHabits.map(habitProgress => (
              <HabitCard
                key={habitProgress.habit.id}
                habitProgress={habitProgress}
                onComplete={handleCompleteHabit}
                className=""
              />
            ))}
          </View>
          
          <View className="mb-md">
            <Text className="text-sm text-text-secondary mb-xs text-center">
              오늘 진행률: {Math.round(progressPercentage)}% ({completedHabits}/{totalHabits})
            </Text>
            <View className="h-2 bg-text-disabled rounded overflow-hidden">
              <View
                className="h-full bg-primary rounded"
                style={{ width: `${progressPercentage}%` }}
              />
            </View>
          </View>
          
          <Button
            title="+ 습관 추가하기"
            onPress={() => console.log('습관 추가')}
            variant="ghost"
            className="self-center"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeScreen;