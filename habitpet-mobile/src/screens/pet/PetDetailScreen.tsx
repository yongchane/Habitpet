import React from 'react';
import { View, Text } from 'react-native';


const PetDetailScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">펫 상세</Text>
      <Text className="text-base text-text-secondary">펫의 상세 정보가 여기에 표시됩니다.</Text>
    </View>
  );
};


export default PetDetailScreen;