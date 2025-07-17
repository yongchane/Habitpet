import React from "react";
import { View, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "large",
  color = "#4ECDC4",
  className = "",
}) => {
  return (
    <View className={` justify-center items-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
