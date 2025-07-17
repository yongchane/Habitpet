import React from 'react';
import { Modal as RNModal, View, TouchableWithoutFeedback } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  className?: string;
}


const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdropPress = true,
  className = '',
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View className="flex-1 bg-black/40 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className={`bg-card-bg rounded-lg p-lg mx-lg max-w-[90%] max-h-[80%] shadow-lg shadow-black/25 ${className}`}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;