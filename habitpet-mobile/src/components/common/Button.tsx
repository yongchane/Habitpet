import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : COLORS.PRIMARY} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    minHeight: 48,
  },
  
  // Variants
  primary: {
    backgroundColor: COLORS.PRIMARY,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  
  // Sizes
  small: {
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
    minHeight: 36,
  },
  
  medium: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    minHeight: 48,
  },
  
  large: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    minHeight: 56,
  },
  
  // Disabled state
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  primaryText: {
    color: 'white',
    fontSize: FONT_SIZES.BUTTON,
  },
  
  secondaryText: {
    color: COLORS.PRIMARY,
    fontSize: FONT_SIZES.BUTTON,
  },
  
  ghostText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FONT_SIZES.CAPTION,
  },
  
  smallText: {
    fontSize: FONT_SIZES.CAPTION,
  },
  
  mediumText: {
    fontSize: FONT_SIZES.BUTTON,
  },
  
  largeText: {
    fontSize: FONT_SIZES.SUBTITLE,
  },
  
  disabledText: {
    color: COLORS.TEXT_DISABLED,
  },
});

export default Button;