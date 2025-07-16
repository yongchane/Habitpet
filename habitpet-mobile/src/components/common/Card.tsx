import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'habit' | 'pet' | 'stat';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  const cardStyle = [
    styles.card,
    styles[variant],
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  
  default: {
    // 기본 스타일
  },
  
  habit: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.ACCENT,
  },
  
  pet: {
    backgroundColor: COLORS.PET_HOME_BACKGROUND,
  },
  
  stat: {
    backgroundColor: COLORS.FEEDING_SECTION_BACKGROUND,
  },
});

export default Card;