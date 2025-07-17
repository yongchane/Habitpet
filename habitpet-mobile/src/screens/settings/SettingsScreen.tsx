import React from 'react';
import { View, Text } from 'react-native';


const SettingsScreen = () => {
  return (
    <View className="flex-1 p-5 bg-background">
      <Text className="text-2xl font-bold text-text-primary mb-2.5">설정</Text>
      <Text className="text-base text-text-secondary">앱 설정을 여기에서 설정하세요.</Text>
    </View>
  );
};


export default SettingsScreen;