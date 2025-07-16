import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pet } from '../../types';
import { COLORS, FONT_SIZES, SPACING } from '../../constants';
import { ProgressBar } from '../common';

interface PetStatusBarProps {
  pet: Pet;
  style?: any;
}

export const PetStatusBar: React.FC<PetStatusBarProps> = ({ pet, style }) => {
  const getTraitDisplayName = (trait: string) => {
    const traitNames: Record<string, string> = {
      exercise: '운동',
      study: '학습',
      cooking: '요리',
      music: '음악',
      meditation: '명상',
    };
    return traitNames[trait] || trait;
  };

  const getTraitDescription = () => {
    if (pet.primary_trait && pet.secondary_trait) {
      return `${getTraitDisplayName(pet.primary_trait)} + ${getTraitDisplayName(pet.secondary_trait)} 특성`;
    } else if (pet.primary_trait) {
      return `${getTraitDisplayName(pet.primary_trait)} 특성 발달 중`;
    } else {
      return '특성 발달 중';
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* 펫 이름과 레벨 */}
      <View style={styles.header}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.level}>Lv.{pet.level}</Text>
      </View>
      
      {/* 특성 설명 */}
      <Text style={styles.traitDescription}>{getTraitDescription()}</Text>
      
      {/* 상태 바들 */}
      <View style={styles.statusBars}>
        {/* 배고픔 */}
        <View style={styles.statusItem}>
          <View style={styles.statusLabel}>
            <Text style={styles.statusIcon}>🍽️</Text>
            <Text style={styles.statusText}>배고픔</Text>
          </View>
          <ProgressBar
            progress={pet.hunger / 100}
            color={pet.hunger > 30 ? COLORS.STATUS.success : COLORS.STATUS.warning}
            showLabel
            label={`${pet.hunger}%`}
            style={styles.progressBar}
          />
        </View>
        
        {/* 행복도 */}
        <View style={styles.statusItem}>
          <View style={styles.statusLabel}>
            <Text style={styles.statusIcon}>😊</Text>
            <Text style={styles.statusText}>행복도</Text>
          </View>
          <ProgressBar
            progress={pet.happiness / 100}
            color={pet.happiness > 50 ? COLORS.STATUS.success : COLORS.STATUS.warning}
            showLabel
            label={`${pet.happiness}%`}
            style={styles.progressBar}
          />
        </View>
        
        {/* 경험치 */}
        <View style={styles.statusItem}>
          <View style={styles.statusLabel}>
            <Text style={styles.statusIcon}>⭐</Text>
            <Text style={styles.statusText}>경험치</Text>
          </View>
          <ProgressBar
            progress={pet.experience % 100 / 100}
            color={COLORS.ACCENT}
            showLabel
            label={`${pet.experience % 100}/100`}
            style={styles.progressBar}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: 12,
    padding: SPACING.MD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  
  petName: {
    fontSize: FONT_SIZES.SUBTITLE,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  
  level: {
    fontSize: FONT_SIZES.BODY,
    fontWeight: '500',
    color: COLORS.PRIMARY,
  },
  
  traitDescription: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
  },
  
  statusBars: {
    gap: SPACING.SM,
  },
  
  statusItem: {
    gap: SPACING.XS,
  },
  
  statusLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.XS,
  },
  
  statusIcon: {
    fontSize: 16,
  },
  
  statusText: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  
  progressBar: {
    height: 8,
  },
});

export default PetStatusBar;