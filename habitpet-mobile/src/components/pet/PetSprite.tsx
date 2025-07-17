import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Pet, PetAnimationState } from "../../types";
import { PET_CONSTANTS, ANIMATION_CONSTANTS } from "../../constants";

interface PetSpriteProps {
  pet: Pet;
  onTouch?: () => void;
  interactive?: boolean;
  className?: string;
}


export const PetSprite: React.FC<PetSpriteProps> = ({
  pet,
  onTouch,
  interactive = true,
  className = '',
}) => {
  const [animationState, setAnimationState] = useState<PetAnimationState>({
    current: "idle",
    isPlaying: false,
    loop: true,
  });

  const [currentFrame, setCurrentFrame] = useState(0);

  // 펫 크기 계산
  const spriteSize = PET_CONSTANTS.SPRITE_SIZES[`STAGE_${pet.evolution_stage}`];

  // 애니메이션 프레임 업데이트
  useEffect(() => {
    if (!animationState.isPlaying && animationState.current !== "idle") {
      setAnimationState((prev) => ({
        ...prev,
        current: "idle",
        isPlaying: true,
      }));
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 4); // 4프레임 루프
    }, 500); // 0.5초마다 프레임 변경

    return () => clearInterval(interval);
  }, [animationState]);

  // 펫 터치 핸들러
  const handleTouch = () => {
    if (interactive && onTouch) {
      setAnimationState({
        current: "happy",
        isPlaying: true,
        loop: false,
      });
      onTouch();

      // 2초 후 idle로 돌아가기
      setTimeout(() => {
        setAnimationState({
          current: "idle",
          isPlaying: true,
          loop: true,
        });
      }, 2000);
    }
  };

  // 먹이 주기 애니메이션
  const playEatingAnimation = () => {
    setAnimationState({
      current: "eating",
      isPlaying: true,
      loop: false,
    });

    setTimeout(() => {
      setAnimationState({
        current: "idle",
        isPlaying: true,
        loop: true,
      });
    }, 3000);
  };

  // 진화 애니메이션
  const playEvolutionAnimation = () => {
    setAnimationState({
      current: "evolving",
      isPlaying: true,
      loop: false,
    });

    setTimeout(() => {
      setAnimationState({
        current: "idle",
        isPlaying: true,
        loop: true,
      });
    }, ANIMATION_CONSTANTS.DURATIONS.EVOLUTION);
  };

  // 펫 이미지 경로 생성
  const getImagePath = () => {
    const trait = pet.primary_trait || "default";
    return `pets/${pet.pet_type}/stage${pet.evolution_stage}/${trait}/${animationState.current}_${currentFrame}.png`;
  };

  return (
    <TouchableOpacity
      className={`justify-center items-center ${className}`}
      onPress={handleTouch}
      disabled={!interactive}
      activeOpacity={0.8}
    >
      <View
        className="relative justify-center items-center"
        style={{ width: spriteSize, height: spriteSize }}
      >
        {/* 실제 구현시에는 Image 컴포넌트로 스프라이트 이미지 로드 */}
        <View
          className="bg-gray-100 rounded justify-center items-center"
          style={{ width: spriteSize, height: spriteSize }}
        >
          {/* 임시 펫 표시 */}
          {/* <Image
            source={require('../../../assets/images/pet-placeholder.png')}
            style={{ width: spriteSize, height: spriteSize }}
            resizeMode="contain"
          /> */}
        </View>

        {/* 애니메이션 효과 */}
        {animationState.current === "happy" && (
          <View className="absolute -top-2.5 -left-2.5 -right-2.5 -bottom-2.5">
            {/* 하트 파티클 효과 */}
          </View>
        )}

        {animationState.current === "eating" && (
          <View className="absolute -top-1.5 -right-1.5">
            {/* 먹이 효과 */}
          </View>
        )}

        {animationState.current === "evolving" && (
          <View className="absolute -top-5 -left-5 -right-5 -bottom-5">
            {/* 진화 빛 효과 */}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};


export default PetSprite;
