import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { AppState, User, Pet, Habit, HabitProgress, UserScore } from '../types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setPet: (pet: Pet) => void;
  setHabits: (habits: Habit[]) => void;
  setTodayProgress: (progress: HabitProgress[]) => void;
  completeHabit: (habitId: string) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  deleteHabit: (habitId: string) => void;
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
  showModal: (modalType: keyof AppState['ui']['modals']) => void;
  hideModal: (modalType: keyof AppState['ui']['modals']) => void;
  showNotification: (notification: Partial<AppState['ui']['notifications']>) => void;
  hideNotification: () => void;
}

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    user: null,
    pets: {
      current: null,
      collection: [],
      evolution: [],
    },
    habits: {
      list: [],
      todayProgress: [],
      statistics: {
        totalHabits: 0,
        completedToday: 0,
        weeklyCompletion: 0,
        monthlyCompletion: 0,
        categoryBreakdown: {
          exercise: 0,
          study: 0,
          cooking: 0,
          music: 0,
          meditation: 0,
          other: 0,
        },
      },
    },
    ui: {
      loading: false,
      activeTab: 'Home',
      modals: {
        addHabit: false,
        editHabit: false,
        petDetail: false,
        habitDetail: false,
        confirmDialog: false,
      },
      notifications: {
        visible: false,
        type: 'info',
        title: '',
        message: '',
      },
    },

    // Actions
    setUser: (user) => set({ user }),

    setPet: (pet) => set(state => ({
      pets: { ...state.pets, current: pet }
    })),

    setHabits: (habits) => set(state => ({
      habits: { ...state.habits, list: habits }
    })),

    setTodayProgress: (progress) => set(state => ({
      habits: { ...state.habits, todayProgress: progress }
    })),

    completeHabit: (habitId) => set(state => {
      const updatedProgress = state.habits.todayProgress.map(progress => {
        if (progress.habit.id === habitId && !progress.completed) {
          return {
            ...progress,
            completed: true,
            completedAt: new Date().toISOString(),
            pointsEarned: progress.habit.points_per_completion * progress.habit.difficulty,
          };
        }
        return progress;
      });

      // 통계 업데이트
      const completedToday = updatedProgress.filter(p => p.completed).length;
      const totalHabits = updatedProgress.length;

      return {
        habits: {
          ...state.habits,
          todayProgress: updatedProgress,
          statistics: {
            ...state.habits.statistics,
            completedToday,
            totalHabits,
          },
        },
      };
    }),

    addHabit: (habit) => set(state => ({
      habits: {
        ...state.habits,
        list: [...state.habits.list, habit],
      }
    })),

    updateHabit: (habitId, updates) => set(state => ({
      habits: {
        ...state.habits,
        list: state.habits.list.map(habit =>
          habit.id === habitId ? { ...habit, ...updates } : habit
        ),
      }
    })),

    deleteHabit: (habitId) => set(state => ({
      habits: {
        ...state.habits,
        list: state.habits.list.filter(habit => habit.id !== habitId),
        todayProgress: state.habits.todayProgress.filter(p => p.habit.id !== habitId),
      }
    })),

    setLoading: (loading) => set(state => ({
      ui: { ...state.ui, loading }
    })),

    setActiveTab: (tab) => set(state => ({
      ui: { ...state.ui, activeTab: tab }
    })),

    showModal: (modalType) => set(state => ({
      ui: {
        ...state.ui,
        modals: { ...state.ui.modals, [modalType]: true }
      }
    })),

    hideModal: (modalType) => set(state => ({
      ui: {
        ...state.ui,
        modals: { ...state.ui.modals, [modalType]: false }
      }
    })),

    showNotification: (notification) => set(state => ({
      ui: {
        ...state.ui,
        notifications: {
          ...state.ui.notifications,
          visible: true,
          ...notification,
        }
      }
    })),

    hideNotification: () => set(state => ({
      ui: {
        ...state.ui,
        notifications: { ...state.ui.notifications, visible: false }
      }
    })),
  }))
);

// Selectors
export const useUser = () => useAppStore(state => state.user);
export const usePet = () => useAppStore(state => state.pets.current);
export const useHabits = () => useAppStore(state => state.habits.list);
export const useTodayProgress = () => useAppStore(state => state.habits.todayProgress);
export const useHabitStatistics = () => useAppStore(state => state.habits.statistics);
export const useLoading = () => useAppStore(state => state.ui.loading);
export const useActiveTab = () => useAppStore(state => state.ui.activeTab);
export const useModals = () => useAppStore(state => state.ui.modals);
export const useNotifications = () => useAppStore(state => state.ui.notifications);

// Actions
export const useAppActions = () => useAppStore(state => ({
  setUser: state.setUser,
  setPet: state.setPet,
  setHabits: state.setHabits,
  setTodayProgress: state.setTodayProgress,
  completeHabit: state.completeHabit,
  addHabit: state.addHabit,
  updateHabit: state.updateHabit,
  deleteHabit: state.deleteHabit,
  setLoading: state.setLoading,
  setActiveTab: state.setActiveTab,
  showModal: state.showModal,
  hideModal: state.hideModal,
  showNotification: state.showNotification,
  hideNotification: state.hideNotification,
}));

// Subscribe to state changes for side effects
useAppStore.subscribe(
  (state) => state.habits.todayProgress,
  (todayProgress) => {
    // 습관 완료 시 알림 표시
    const justCompleted = todayProgress.find(p => p.completed && p.completedAt);
    if (justCompleted && justCompleted.completedAt) {
      const completedTime = new Date(justCompleted.completedAt);
      const now = new Date();
      const timeDiff = now.getTime() - completedTime.getTime();
      
      // 5초 이내에 완료된 습관이면 알림 표시
      if (timeDiff < 5000) {
        useAppStore.getState().showNotification({
          type: 'success',
          title: '습관 완료!',
          message: `${justCompleted.habit.title}을(를) 완료했어요! +${justCompleted.pointsEarned}P`,
        });
        
        // 3초 후 알림 자동 숨김
        setTimeout(() => {
          useAppStore.getState().hideNotification();
        }, 3000);
      }
    }
  }
);

export default useAppStore;