import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants';

interface ProgressBarProps {
  progress: number; // 0-1 범위
  height?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  style?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color = COLORS.PRIMARY,
  backgroundColor = COLORS.TEXT_DISABLED,
  showLabel = false,
  label,
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={styles.label}>
          {label || `${percentage}%`}
        </Text>
      )}
      <View style={[styles.track, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  label: {
    fontSize: FONT_SIZES.CAPTION,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XS,
    textAlign: 'right',
  },
  
  track: {
    borderRadius: BORDER_RADIUS.SM,
    overflow: 'hidden',
  },
  
  fill: {
    borderRadius: BORDER_RADIUS.SM,
  },
});

export default ProgressBar;