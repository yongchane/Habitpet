import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, LoadingSpinner } from '../../components/common';
import { useSetUser } from '../../store';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface Props {
  navigation: AuthScreenNavigationProp;
}


const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const setUser = useSetUser();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // TODO: 실제 Google 로그인 구현
      console.log('Google 로그인 시도');
      
      // 임시 사용자 데이터
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        username: 'TestUser',
        avatar_url: undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        subscription_type: 'free' as const,
        subscription_expires_at: undefined,
      };
      
      setUser(mockUser);
      
      // 잠시 대기 후 메인 화면으로 이동
      setTimeout(() => {
        navigation.replace('Main');
      }, 1000);
      
    } catch (error) {
      console.error('Google 로그인 오류:', error);
      Alert.alert('로그인 실패', '다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      // TODO: 실제 Apple 로그인 구현
      console.log('Apple 로그인 시도');
      Alert.alert('준비 중', 'Apple 로그인 기능을 준비 중입니다.');
    } catch (error) {
      console.error('Apple 로그인 오류:', error);
      Alert.alert('로그인 실패', '다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = () => {
    Alert.alert('준비 중', '이메일 로그인 기능을 준비 중입니다.');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <LoadingSpinner size="large" color="#4ECDC4" />
        <Text className="text-base text-text-secondary mt-4">로그인 중...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center px-6">
        {/* 로고 및 환영 메시지 */}
        <View className="items-center mb-12">
          <Text className="text-[80px] mb-2">🐾</Text>
          <Text className="text-3xl font-bold text-primary mb-4">HabitPet</Text>
          <Text className="text-lg text-text-secondary text-center">
            반가워요!{'\n'}
            지금 시작해보세요
          </Text>
        </View>

        {/* 로그인 버튼들 */}
        <View className="gap-4">
          <Button
            title="🔵 구글로 시작하기"
            onPress={handleGoogleSignIn}
            variant="primary"
            size="large"
          />
          
          <Button
            title="⚫ 애플로 시작하기"
            onPress={handleAppleSignIn}
            variant="secondary"
            size="large"
          />
          
          <TouchableOpacity
            className="py-4 px-6 bg-transparent border border-gray-300 rounded-md mt-4"
            onPress={handleEmailSignIn}
          >
            <Text className="text-base font-medium text-text-primary text-center">
              이메일로 시작하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 정보 */}
      <View className="px-6 pb-8">
        <Text className="text-xs text-text-secondary text-center leading-5">
          가입하면 서비스 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
        </Text>
      </View>
    </View>
  );
};


export default AuthScreen;