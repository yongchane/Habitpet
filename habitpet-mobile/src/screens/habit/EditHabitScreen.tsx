import React from 'react';
import { View, Text } from 'react-native';


const EditHabitScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">습관 편집</Text>
      <Text className="text-base text-text-secondary">습관을 수정하세요.</Text>
    </View>
  );
};


export default EditHabitScreen;