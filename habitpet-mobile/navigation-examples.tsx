// React Native 네비게이션 사용 예시

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const NavigationExamples = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 p-4 gap-4">
      {/* 1. 기본 네비게이션 - 새 화면으로 이동 */}
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg"
        onPress={() => navigation.navigate("AddHabit")}
      >
        <Text className="text-white text-center">새 습관 추가하기</Text>
      </TouchableOpacity>

      {/* 2. 파라미터와 함께 이동 */}
      <TouchableOpacity
        className="bg-secondary p-4 rounded-lg"
        onPress={() => navigation.navigate("HabitDetail", { habitId: "123" })}
      >
        <Text className="text-white text-center">습관 상세보기 (ID: 123)</Text>
      </TouchableOpacity>

      {/* 3. 스택에 푸시 (같은 화면이라도 새로 추가) */}
      <TouchableOpacity
        className="bg-accent p-4 rounded-lg"
        onPress={() => navigation.push("PetDetail", { petId: "456" })}
      >
        <Text className="text-white text-center">펫 상세보기 (새 스택)</Text>
      </TouchableOpacity>

      {/* 4. 뒤로가기 */}
      <TouchableOpacity
        className="bg-gray-500 p-4 rounded-lg"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white text-center">뒤로가기</Text>
      </TouchableOpacity>

      {/* 5. 루트로 이동 (모든 스택 제거) */}
      <TouchableOpacity
        className="bg-red-500 p-4 rounded-lg"
        onPress={() => navigation.popToTop()}
      >
        <Text className="text-white text-center">홈으로 이동</Text>
      </TouchableOpacity>

      {/* 6. 스택 리셋 (완전히 새로운 플로우) */}
      <TouchableOpacity
        className="bg-purple-500 p-4 rounded-lg"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        }
      >
        <Text className="text-white text-center">메인으로 리셋</Text>
      </TouchableOpacity>

      {/* 7. 탭 네비게이션 (메인 화면 내에서) */}
      <TouchableOpacity
        className="bg-green-500 p-4 rounded-lg"
        onPress={() => {
          // 먼저 Main으로 이동한 후 특정 탭으로
          navigation.navigate("Main", {
            screen: "Habits", // 습관 탭으로 이동
          });
        }}
      >
        <Text className="text-white text-center">습관 탭으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
};

// 화면에서 파라미터 받기
const HabitDetailScreen = ({ route }: { route: any }) => {
  const { habitId } = route.params;

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">습관 ID: {habitId}</Text>
    </View>
  );
};

export default NavigationExamples;
