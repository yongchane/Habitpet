import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList, MainTabParamList } from '../types';
import { useUser } from '../store';
import { COLORS } from '../constants';

// Screens
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import HomeScreen from '../screens/main/HomeScreen';
import HabitsScreen from '../screens/main/HabitsScreen';
import StatsScreen from '../screens/main/StatsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import HabitDetailScreen from '../screens/habit/HabitDetailScreen';
import AddHabitScreen from '../screens/habit/AddHabitScreen';
import EditHabitScreen from '../screens/habit/EditHabitScreen';
import PetDetailScreen from '../screens/pet/PetDetailScreen';
import PetCollectionScreen from '../screens/pet/PetCollectionScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// 탭 네비게이션 컴포넌트
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.CARD_BACKGROUND,
          borderTopWidth: 1,
          borderTopColor: COLORS.TEXT_DISABLED,
          height: 83,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_SECONDARY,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🏠" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Habits"
        component={HabitsScreen}
        options={{
          tabBarLabel: '습관',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📝" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📊" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="👤" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// 탭 아이콘 컴포넌트
const TabIcon = ({ icon, size, color }: { icon: string; size: number; color: string }) => {
  return (
    <Text style={{ fontSize: size, color }}>
      {icon}
    </Text>
  );
};

// 메인 네비게이션 컴포넌트
const AppNavigator = () => {
  const user = useUser();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      >
        {!user ? (
          // 인증되지 않은 사용자 플로우
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          // 인증된 사용자 플로우
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="HabitDetail"
              component={HabitDetailScreen}
              options={{
                headerShown: true,
                headerTitle: '습관 상세',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen
              name="AddHabit"
              component={AddHabitScreen}
              options={{
                headerShown: true,
                headerTitle: '새 습관 추가',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen
              name="EditHabit"
              component={EditHabitScreen}
              options={{
                headerShown: true,
                headerTitle: '습관 편집',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen
              name="PetDetail"
              component={PetDetailScreen}
              options={{
                headerShown: true,
                headerTitle: '펫 상세',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen
              name="PetCollection"
              component={PetCollectionScreen}
              options={{
                headerShown: true,
                headerTitle: '펫 도감',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: true,
                headerTitle: '설정',
                headerStyle: {
                  backgroundColor: COLORS.CARD_BACKGROUND,
                },
                headerTintColor: COLORS.TEXT_PRIMARY,
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;