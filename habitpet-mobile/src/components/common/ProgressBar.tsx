import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-1 범위
  height?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}


const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color = '#4ECDC4',
  backgroundColor = '#BDBDBD',
  showLabel = false,
  label,
  className = '',
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View className={`w-full ${className}`}>
      {showLabel && (
        <Text className="text-sm text-text-secondary mb-xs text-right">
          {label || `${percentage}%`}
        </Text>
      )}
      <View 
        className="rounded-sm overflow-hidden"
        style={{ height, backgroundColor }}
      >
        <View
          className="rounded-sm"
          style={{
            width: `${percentage}%`,
            height,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;