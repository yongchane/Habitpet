import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'justify-center items-center rounded-md min-h-[48px]';
    
    const variantClasses = {
      primary: 'bg-primary shadow-lg shadow-primary/30',
      secondary: 'bg-transparent border-2 border-primary',
      ghost: 'bg-transparent',
    };
    
    const sizeClasses = {
      small: 'px-sm py-xs min-h-[36px]',
      medium: 'px-md py-sm min-h-[48px]',
      large: 'px-lg py-md min-h-[56px]',
    };
    
    const disabledClasses = disabled ? 'opacity-60' : '';
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  };

  const getTextClasses = () => {
    const baseClasses = 'font-semibold text-center';
    
    const variantClasses = {
      primary: 'text-white',
      secondary: 'text-primary',
      ghost: 'text-text-secondary',
    };
    
    const sizeClasses = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    };
    
    const disabledClasses = disabled ? 'text-gray-400' : '';
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`;
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#4ECDC4'} />
      ) : (
        <Text className={getTextClasses()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};


export default Button;