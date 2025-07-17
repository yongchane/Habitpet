import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { Button } from "../../components/common";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get("window");

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "나만의 픽셀 펫과 함께하는\n습관 여행",
      description: "작은 습관이 특별한 펫을 만들어요",
      image: "🐱",
    },
    {
      title: "습관을 먹이로 바꿔보세요",
      description: "운동, 공부, 요리... 모든 습관이\n펫의 성장 에너지가 됩니다",
      image: "🍎",
    },
    {
      title: "펫이 나의 습관을 따라 성장해요",
      description: "운동을 많이 하면 머슬 펫으로,\n공부를 하면 학자 펫으로!",
      image: "🌱",
    },
    {
      title: "지금 시작해보세요",
      description:
        "건강하고 행복한 습관을 만들어\n나만의 특별한 펫을 키워보세요",
      image: "🎉",
    },
  ];

  const handleSkip = () => {
    navigation.replace("Auth");
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace("Auth");
    }
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  return (
    <View className="flex-1 bg-background">
      {/* 상단 건너뛰기 버튼 */}
      <View className="flex-row justify-end items-center px-md pt-[50px] pb-sm">
        <Button
          title="건너뛰기"
          onPress={handleSkip}
          variant="ghost"
          size="small"
          className="px-sm"
        />
      </View>

      {/* 슬라이드 컨테이너 */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            className="flex-1 justify-center items-center px-lg"
            style={{ width }}
          >
            <View className="items-center max-w-[300px]">
              <Text className="text-[100px] mb-10">{slide.image}</Text>
              <Text className="text-xl font-bold text-text-primary text-center mb-md leading-8">
                {slide.title}
              </Text>
              <Text className="text-base text-text-secondary text-center leading-6">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 하단 인디케이터 및 버튼 */}
      <View className="px-lg pb-xl pt-md items-center">
        {/* 페이지 인디케이터 */}
        <View className="flex-row mb-lg">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded mx-1 ${
                index === currentSlide ? "bg-primary w-6" : "bg-text-disabled"
              }`}
            />
          ))}
        </View>

        {/* 다음 버튼 */}
        <Button
          title={currentSlide === slides.length - 1 ? "시작하기" : "다음"}
          onPress={handleNext}
          variant="primary"
          className="w-full mt-sm"
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
