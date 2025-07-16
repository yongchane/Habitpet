import { supabase } from '../supabase';
import { Pet, PetEvolutionHistory } from '../../types';

export class PetService {
  // 사용자의 현재 펫 조회
  static async getCurrentPet(userId: string): Promise<Pet | null> {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // 데이터가 없는 경우
      }
      throw new Error(`펫 조회 실패: ${error.message}`);
    }

    return data;
  }

  // 새로운 펫 생성
  static async createPet(userId: string, petData: {
    name: string;
    pet_type: 'cat' | 'dog' | 'rabbit';
  }): Promise<Pet> {
    const { data, error } = await supabase
      .from('pets')
      .insert({
        user_id: userId,
        name: petData.name,
        pet_type: petData.pet_type,
        level: 1,
        experience: 0,
        hunger: 50,
        happiness: 50,
        evolution_stage: 1,
        trait_points: {
          exercise: 0,
          study: 0,
          cooking: 0,
          music: 0,
          meditation: 0,
        },
      })
      .select()
      .single();

    if (error) {
      throw new Error(`펫 생성 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 상태 업데이트
  static async updatePetStatus(petId: string, updates: Partial<Pet>): Promise<Pet> {
    const { data, error } = await supabase
      .from('pets')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', petId)
      .select()
      .single();

    if (error) {
      throw new Error(`펫 상태 업데이트 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 먹이 주기 (Supabase Function 사용)
  static async feedPet(petId: string, foodAmount: number): Promise<{
    success: boolean;
    new_hunger: number;
    new_happiness: number;
    level_up: boolean;
  }> {
    const { data, error } = await supabase.rpc('feed_pet', {
      pet_id: petId,
      food_amount: foodAmount,
    });

    if (error) {
      throw new Error(`펫 먹이 주기 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 진화 체크 (Supabase Function 사용)
  static async checkPetEvolution(petId: string): Promise<{
    should_evolve: boolean;
    dominant_trait: string;
    trait_points: any;
    evolution_threshold: number;
  }> {
    const { data, error } = await supabase.rpc('check_pet_evolution', {
      pet_id: petId,
    });

    if (error) {
      throw new Error(`펫 진화 체크 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 컬렉션 조회 (사용자가 키운 모든 펫)
  static async getPetCollection(userId: string): Promise<Pet[]> {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`펫 컬렉션 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 펫 진화 히스토리 조회
  static async getPetEvolutionHistory(petId: string): Promise<PetEvolutionHistory[]> {
    const { data, error } = await supabase
      .from('pet_evolution_history')
      .select('*')
      .eq('pet_id', petId)
      .order('evolved_at', { ascending: false });

    if (error) {
      throw new Error(`펫 진화 히스토리 조회 실패: ${error.message}`);
    }

    return data || [];
  }

  // 펫 특성 포인트 업데이트
  static async updatePetTraitPoints(petId: string, category: string, points: number): Promise<Pet> {
    // 현재 펫 데이터 조회
    const { data: currentPet, error: fetchError } = await supabase
      .from('pets')
      .select('trait_points')
      .eq('id', petId)
      .single();

    if (fetchError) {
      throw new Error(`펫 데이터 조회 실패: ${fetchError.message}`);
    }

    // 특성 포인트 업데이트
    const updatedTraitPoints = {
      ...currentPet.trait_points,
      [category]: (currentPet.trait_points[category] || 0) + points,
    };

    const { data, error } = await supabase
      .from('pets')
      .update({
        trait_points: updatedTraitPoints,
        updated_at: new Date().toISOString(),
      })
      .eq('id', petId)
      .select()
      .single();

    if (error) {
      throw new Error(`펫 특성 포인트 업데이트 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 이름 변경
  static async updatePetName(petId: string, name: string): Promise<Pet> {
    const { data, error } = await supabase
      .from('pets')
      .update({
        name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', petId)
      .select()
      .single();

    if (error) {
      throw new Error(`펫 이름 변경 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 레벨업 체크
  static async checkLevelUp(petId: string): Promise<Pet> {
    const { data: pet, error: fetchError } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .single();

    if (fetchError) {
      throw new Error(`펫 데이터 조회 실패: ${fetchError.message}`);
    }

    // 레벨업 필요 경험치 계산
    const requiredExp = pet.level * 100;
    
    if (pet.experience >= requiredExp) {
      const newLevel = pet.level + 1;
      const remainingExp = pet.experience - requiredExp;

      const { data, error } = await supabase
        .from('pets')
        .update({
          level: newLevel,
          experience: remainingExp,
          updated_at: new Date().toISOString(),
        })
        .eq('id', petId)
        .select()
        .single();

      if (error) {
        throw new Error(`펫 레벨업 실패: ${error.message}`);
      }

      return data;
    }

    return pet;
  }

  // 펫 상태 감소 (시간 경과에 따른)
  static async decreasePetStats(petId: string): Promise<Pet> {
    const { data: pet, error: fetchError } = await supabase
      .from('pets')
      .select('*')
      .eq('id', petId)
      .single();

    if (fetchError) {
      throw new Error(`펫 데이터 조회 실패: ${fetchError.message}`);
    }

    // 마지막 먹이 준 시간으로부터 경과 시간 계산
    const lastFedTime = new Date(pet.last_fed_at);
    const now = new Date();
    const hoursElapsed = (now.getTime() - lastFedTime.getTime()) / (1000 * 60 * 60);

    // 시간당 감소량 계산
    const hungerDecrease = Math.floor(hoursElapsed * 2); // 시간당 2씩 감소
    const happinessDecrease = Math.floor(hoursElapsed * 1); // 시간당 1씩 감소

    const newHunger = Math.max(0, pet.hunger - hungerDecrease);
    const newHappiness = Math.max(0, pet.happiness - happinessDecrease);

    const { data, error } = await supabase
      .from('pets')
      .update({
        hunger: newHunger,
        happiness: newHappiness,
        updated_at: new Date().toISOString(),
      })
      .eq('id', petId)
      .select()
      .single();

    if (error) {
      throw new Error(`펫 상태 감소 실패: ${error.message}`);
    }

    return data;
  }

  // 펫 상태 실시간 구독
  static subscribeToPetUpdates(petId: string, callback: (pet: Pet) => void) {
    return supabase
      .channel(`pet-${petId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'pets',
          filter: `id=eq.${petId}`,
        },
        (payload) => {
          callback(payload.new as Pet);
        }
      )
      .subscribe();
  }

  // 펫 통계 조회
  static async getPetStats(petId: string) {
    const { data, error } = await supabase
      .from('pets')
      .select(`
        *,
        pet_evolution_history (
          evolved_at,
          from_stage,
          to_stage,
          trigger_trait
        )
      `)
      .eq('id', petId)
      .single();

    if (error) {
      throw new Error(`펫 통계 조회 실패: ${error.message}`);
    }

    return data;
  }
}

export default PetService;