import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants';
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
        <View style={styles.loadingContainer}>
          <Text style={styles.logo}>🐾</Text>
          <Text style={styles.appName}>HabitPet</Text>
          <LoadingSpinner size="large" color={COLORS.PRIMARY} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>오류가 발생했습니다</Text>
          <Text style={styles.errorMessage}>{error}</Text>
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: 40,
  },
  
  errorContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Constants.statusBarHeight,
  },
  
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.STATUS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  
  errorMessage: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
});
