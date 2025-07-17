import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';


const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-semibold text-text-primary mb-4">프로필</Text>
        <Text className="text-base text-text-secondary">곧 구현될 예정입니다</Text>
      </View>
    </SafeAreaView>
  );
};


export default ProfileScreen;