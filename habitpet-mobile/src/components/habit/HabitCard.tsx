import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit, HabitProgress } from '../../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS, HABIT_CONSTANTS } from '../../constants';
import { Button } from '../common';

interface HabitCardProps {
  habitProgress: HabitProgress;
  onComplete: (habitId: string) => void;
  onPress?: () => void;
  style?: any;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habitProgress,
  onComplete,
  onPress,
  style,
}) => {
  const { habit, completed } = habitProgress;
  const categoryColor = COLORS.TRAIT_COLORS[habit.category];
  const foodIcon = HABIT_CONSTANTS.FOOD_ICONS[habit.category];

  const handleFeedPress = () => {
    if (!completed) {
      onComplete(habit.id);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryBar, { backgroundColor: categoryColor }]} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.foodIcon}>{foodIcon}</Text>
            <Text style={styles.title}>{habit.title}</Text>
          </View>
          <View style={styles.difficultyContainer}>
            {Array.from({ length: habit.difficulty }).map((_, index) => (
              <Text key={index} style={styles.difficultyIcon}>⭐</Text>
            ))}
          </View>
        </View>
        
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>
              {habit.points_per_completion * habit.difficulty}P
            </Text>
          </View>
          
          <Button
            title={completed ? "먹이 줬음" : "먹이주기"}
            onPress={handleFeedPress}
            variant={completed ? "secondary" : "primary"}
            size="small"
            disabled={completed}
            style={styles.feedButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: SPACING.SM,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  
  categoryBar: {
    width: 4,
  },
  
  content: {
    flex: 1,
    padding: SPACING.MD,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.XS,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  foodIcon: {
    fontSize: 20,
    marginRight: SPACING.XS,
  },
  
  title: {
    fontSize: FONT_SIZES.BODY,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  
  difficultyContainer: {
    flexDirection: 'row',
  },
  
  difficultyIcon: {
    fontSize: 12,
    color: COLORS.ACCENT,
  },
  
  description: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  pointsContainer: {
    backgroundColor: COLORS.FEEDING_SECTION_BACKGROUND,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  
  points: {
    fontSize: FONT_SIZES.CAPTION,
    fontWeight: '600',
    color: COLORS.ACCENT,
  },
  
  feedButton: {
    minWidth: 80,
  },
});

export default HabitCard;