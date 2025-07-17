import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Habit, HabitProgress } from '../../types';
import { HABIT_CONSTANTS } from '../../constants';
import { Button } from '../common';

interface HabitCardProps {
  habitProgress: HabitProgress;
  onComplete: (habitId: string) => void;
  onPress?: () => void;
  className?: string;
}


export const HabitCard: React.FC<HabitCardProps> = ({
  habitProgress,
  onComplete,
  onPress,
  className = '',
}) => {
  const { habit, completed } = habitProgress;
  const categoryColors = {
    exercise: '#FF8A80',
    study: '#81D4FA',
    cooking: '#FFCC80',
    music: '#CE93D8',
    meditation: '#A5D6A7',
    other: '#E0E0E0',
  };
  const categoryColor = categoryColors[habit.category];
  const foodIcon = HABIT_CONSTANTS.FOOD_ICONS[habit.category];

  const handleFeedPress = () => {
    if (!completed) {
      onComplete(habit.id);
    }
  };

  return (
    <TouchableOpacity
      className={`bg-card-bg rounded-md mb-sm shadow-sm shadow-black/8 overflow-hidden flex-row ${className}`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View 
        className="w-1"
        style={{ backgroundColor: categoryColor }}
      />
      
      <View className="flex-1 p-md">
        <View className="flex-row justify-between items-start mb-xs">
          <View className="flex-row items-center flex-1">
            <Text className="text-xl mr-xs">{foodIcon}</Text>
            <Text className="text-base font-semibold text-text-primary flex-1">
              {habit.title}
            </Text>
          </View>
          <View className="flex-row">
            {Array.from({ length: habit.difficulty }).map((_, index) => (
              <Text key={index} className="text-xs text-accent">⭐</Text>
            ))}
          </View>
        </View>
        
        {habit.description && (
          <Text className="text-sm text-text-secondary mb-sm">
            {habit.description}
          </Text>
        )}
        
        <View className="flex-row justify-between items-center">
          <View className="bg-yellow-50 px-sm py-xs rounded-sm">
            <Text className="text-sm font-semibold text-accent">
              {habit.points_per_completion * habit.difficulty}P
            </Text>
          </View>
          
          <Button
            title={completed ? "먹이 줬음" : "먹이주기"}
            onPress={handleFeedPress}
            variant={completed ? "secondary" : "primary"}
            size="small"
            disabled={completed}
            className="min-w-[80px]"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default HabitCard;