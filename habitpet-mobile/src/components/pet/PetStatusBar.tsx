import React from 'react';
import { View, Text } from 'react-native';
import { Pet } from '../../types';
import { ProgressBar } from '../common';

interface PetStatusBarProps {
  pet: Pet;
  className?: string;
}


export const PetStatusBar: React.FC<PetStatusBarProps> = ({ pet, className = '' }) => {
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
    <View className={`bg-card-bg rounded-xl p-md shadow-sm shadow-black/10 ${className}`}>
      {/* 펫 이름과 레벨 */}
      <View className="flex-row justify-between items-center mb-xs">
        <Text className="text-lg font-semibold text-text-primary">{pet.name}</Text>
        <Text className="text-base font-medium text-primary">Lv.{pet.level}</Text>
      </View>
      
      {/* 특성 설명 */}
      <Text className="text-sm text-text-secondary mb-md">{getTraitDescription()}</Text>
      
      {/* 상태 바들 */}
      <View className="gap-sm">
        {/* 배고픔 */}
        <View className="gap-xs">
          <View className="flex-row items-center gap-xs">
            <Text className="text-base">🍽️</Text>
            <Text className="text-sm text-text-primary font-medium">배고픔</Text>
          </View>
          <ProgressBar
            progress={pet.hunger / 100}
            color={pet.hunger > 30 ? '#4CAF50' : '#FF9800'}
            showLabel
            label={`${pet.hunger}%`}
            height={8}
          />
        </View>
        
        {/* 행복도 */}
        <View className="gap-xs">
          <View className="flex-row items-center gap-xs">
            <Text className="text-base">😊</Text>
            <Text className="text-sm text-text-primary font-medium">행복도</Text>
          </View>
          <ProgressBar
            progress={pet.happiness / 100}
            color={pet.happiness > 50 ? '#4CAF50' : '#FF9800'}
            showLabel
            label={`${pet.happiness}%`}
            height={8}
          />
        </View>
        
        {/* 경험치 */}
        <View className="gap-xs">
          <View className="flex-row items-center gap-xs">
            <Text className="text-base">⭐</Text>
            <Text className="text-sm text-text-primary font-medium">경험치</Text>
          </View>
          <ProgressBar
            progress={pet.experience % 100 / 100}
            color="#FFA726"
            showLabel
            label={`${pet.experience % 100}/100`}
            height={8}
          />
        </View>
      </View>
    </View>
  );
};


export default PetStatusBar;