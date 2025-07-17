import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { LoadingSpinner } from "../../components/common";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

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
          navigation.replace("Onboarding");
        }, 3000);
      } catch (error) {
        console.error("앱 초기화 중 오류:", error);
        navigation.replace("Onboarding");
      }
    };

    initializeApp();
  }, [navigation]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-lg">
        {/* 로고 */}
        <View className="items-center mb-xl">
          <Text className="text-[80px] mb-sm">🐾</Text>
          <Text className="text-3xl font-bold text-primary tracking-wide">HabitPet</Text>
        </View>

        {/* 슬로건 */}
        <Text className="text-base text-text-secondary text-center mb-20 leading-6">
          습관과 함께 성장하는 나만의 펫
        </Text>
      </View>

      {/* 하단 정보 */}
      <View className="pb-xl items-center">
        <Text className="text-sm text-text-secondary text-center">
          작은 습관이 특별한 펫을 만들어요
        </Text>
      </View>
    </View>
  );
};


export default SplashScreen;
