import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONT_SIZES, SPACING } from '../../constants';
import { LoadingSpinner } from '../../components/common';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    // 앱 초기화 로직
    const initializeApp = async () => {
      try {
        // 로컬 스토리지에서 사용자 정보 확인
        // await checkUserSession();
        
        // 3초 후 다음 화면으로 이동
        setTimeout(() => {
          navigation.replace('Onboarding');
        }, 3000);
      } catch (error) {
        console.error('앱 초기화 중 오류:', error);
        navigation.replace('Onboarding');
      }
    };

    initializeApp();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 로고 */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🐾</Text>
          <Text style={styles.appName}>HabitPet</Text>
        </View>
        
        {/* 슬로건 */}
        <Text style={styles.slogan}>
          습관과 함께 성장하는 나만의 펫
        </Text>
        
        {/* 로딩 인디케이터 */}
        <View style={styles.loadingContainer}>
          <LoadingSpinner size="large" color={COLORS.PRIMARY} />
        </View>
      </View>
      
      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          작은 습관이 특별한 펫을 만들어요
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
    marginBottom: SPACING.XL,
  },
  
  logo: {
    fontSize: 80,
    marginBottom: SPACING.SM,
  },
  
  appName: {
    fontSize: FONT_SIZES.TITLE * 1.5,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    letterSpacing: 1,
  },
  
  slogan: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.XL * 2,
    lineHeight: 24,
  },
  
  loadingContainer: {
    marginTop: SPACING.XL,
  },
  
  footer: {
    paddingBottom: SPACING.XL,
    alignItems: 'center',
  },
  
  footerText: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default SplashScreen;