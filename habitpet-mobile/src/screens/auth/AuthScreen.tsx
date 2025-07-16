import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants';
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
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>로그인 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 로고 및 환영 메시지 */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐾</Text>
          <Text style={styles.appName}>HabitPet</Text>
          <Text style={styles.welcomeText}>
            반가워요!{'\n'}
            지금 시작해보세요
          </Text>
        </View>

        {/* 로그인 버튼들 */}
        <View style={styles.buttonContainer}>
          <Button
            title="🔵 구글로 시작하기"
            onPress={handleGoogleSignIn}
            variant="primary"
            style={styles.socialButton}
          />
          
          <Button
            title="⚫ 애플로 시작하기"
            onPress={handleAppleSignIn}
            variant="secondary"
            style={styles.socialButton}
          />
          
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailSignIn}
          >
            <Text style={styles.emailButtonText}>이메일로 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          가입하면 서비스 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.XL * 2,
  },
  
  logo: {
    fontSize: 80,
    marginBottom: SPACING.SM,
  },
  
  appName: {
    fontSize: FONT_SIZES.TITLE * 1.2,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: SPACING.MD,
  },
  
  welcomeText: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  buttonContainer: {
    width: '100%',
    gap: SPACING.MD,
  },
  
  socialButton: {
    width: '100%',
    height: 56,
  },
  
  emailButton: {
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    marginTop: SPACING.SM,
  },
  
  emailButtonText: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_SECONDARY,
    textDecorationLine: 'underline',
  },
  
  footer: {
    paddingHorizontal: SPACING.LG,
    paddingBottom: SPACING.XL,
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 18,
  },
  
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  
  loadingText: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.MD,
  },
});

export default AuthScreen;