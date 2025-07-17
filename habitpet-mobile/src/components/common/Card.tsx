import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'habit' | 'pet' | 'stat';
  className?: string;
}


export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const getCardClasses = () => {
    const baseClasses = 'bg-card-bg rounded-lg p-md shadow-md shadow-black/8';
    
    const variantClasses = {
      default: '',
      habit: 'border-l-4 border-accent',
      pet: 'bg-blue-50',
      stat: 'bg-yellow-50',
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${className}`;
  };

  return (
    <View className={getCardClasses()}>
      {children}
    </View>
  );
};

export default Card;