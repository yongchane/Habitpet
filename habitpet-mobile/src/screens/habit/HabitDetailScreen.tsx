import React from 'react';
import { View, Text } from 'react-native';


const HabitDetailScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">습관 상세</Text>
      <Text className="text-base text-text-secondary">상세 정보가 여기에 표시됩니다.</Text>
    </View>
  );
};


export default HabitDetailScreen;