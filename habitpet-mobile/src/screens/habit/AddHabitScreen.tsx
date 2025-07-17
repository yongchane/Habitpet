import React from 'react';
import { View, Text } from 'react-native';


const AddHabitScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">새 습관 추가</Text>
      <Text className="text-base text-text-secondary">새로운 습관을 추가하세요.</Text>
    </View>
  );
};


export default AddHabitScreen;