import React from 'react';
import { View, Text } from 'react-native';


const PetCollectionScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">펫 도감</Text>
      <Text className="text-base text-text-secondary">펫 컴렉션을 확인하세요.</Text>
    </View>
  );
};


export default PetCollectionScreen;