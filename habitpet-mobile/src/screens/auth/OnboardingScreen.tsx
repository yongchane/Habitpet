import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants';
import { Button } from '../../components/common';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '나만의 픽셀 펫과 함께하는\n습관 여행',
      description: '작은 습관이 특별한 펫을 만들어요',
      image: '🐱',
    },
    {
      title: '습관을 먹이로 바꿔보세요',
      description: '운동, 공부, 요리... 모든 습관이\n펫의 성장 에너지가 됩니다',
      image: '🍎',
    },
    {
      title: '펫이 나의 습관을 따라 성장해요',
      description: '운동을 많이 하면 머슬 펫으로,\n공부를 하면 학자 펫으로!',
      image: '🌱',
    },
    {
      title: '지금 시작해보세요',
      description: '건강하고 행복한 습관을 만들어\n나만의 특별한 펫을 키워보세요',
      image: '🎉',
    },
  ];

  const handleSkip = () => {
    navigation.replace('Auth');
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Auth');
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* 상단 건너뛰기 버튼 */}
      <View style={styles.header}>
        <Button
          title="건너뛰기"
          onPress={handleSkip}
          variant="ghost"
          size="small"
          style={styles.skipButton}
        />
      </View>

      {/* 슬라이드 컨테이너 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.slideContainer}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.slideContent}>
              <Text style={styles.slideImage}>{slide.image}</Text>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideDescription}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 인디케이터 및 버튼 */}
      <View style={styles.footer}>
        {/* 페이지 인디케이터 */}
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentSlide && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        {/* 다음 버튼 */}
        <Button
          title={currentSlide === slides.length - 1 ? '시작하기' : '다음'}
          onPress={handleNext}
          variant="primary"
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingTop: SPACING.LG,
    paddingBottom: SPACING.SM,
  },
  
  skipButton: {
    paddingHorizontal: SPACING.SM,
  },
  
  slideContainer: {
    flex: 1,
  },
  
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
  },
  
  slideContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  
  slideImage: {
    fontSize: 100,
    marginBottom: SPACING.XL,
  },
  
  slideTitle: {
    fontSize: FONT_SIZES.TITLE,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.MD,
    lineHeight: 32,
  },
  
  slideDescription: {
    fontSize: FONT_SIZES.BODY,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  footer: {
    paddingHorizontal: SPACING.LG,
    paddingBottom: SPACING.XL,
    paddingTop: SPACING.MD,
    alignItems: 'center',
  },
  
  indicators: {
    flexDirection: 'row',
    marginBottom: SPACING.LG,
  },
  
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.TEXT_DISABLED,
    marginHorizontal: 4,
  },
  
  activeIndicator: {
    backgroundColor: COLORS.PRIMARY,
    width: 24,
  },
  
  nextButton: {
    width: '100%',
    marginTop: SPACING.SM,
  },
});

export default OnboardingScreen;