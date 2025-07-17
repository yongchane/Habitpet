import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import AppNavigator from './src/navigation/AppNavigator';
import { LoadingSpinner } from './src/components/common';


export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 앱 초기화 로직
        // - 폰트 로드
        // - 저장된 사용자 세션 확인
        // - 필요한 권한 요청
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 로딩 시간
        
        setIsLoading(false);
      } catch (err) {
        console.error('앱 초기화 오류:', err);
        setError('앱을 초기화하는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View 
          className="flex-1 bg-background justify-center items-center"
          style={{ paddingTop: Constants.statusBarHeight }}
        >
          <Text className="text-[80px] mb-4">🐾</Text>
          <Text className="text-2xl font-bold text-primary mb-10">HabitPet</Text>
          <LoadingSpinner size="large" color="#4ECDC4" />
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <View 
          className="flex-1 bg-background justify-center items-center px-8"
          style={{ paddingTop: Constants.statusBarHeight }}
        >
          <Text className="text-xl font-semibold text-red-500 mb-4 text-center">
            오류가 발생했습니다
          </Text>
          <Text className="text-base text-text-secondary text-center leading-6">
            {error}
          </Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

