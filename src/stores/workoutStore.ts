import { create } from 'zustand';
import { Exercise, Workout } from '../types/workout';

interface WorkoutStore {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  removeWorkout: (id: string) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  addWorkout: (workout) =>
    set((state) => ({ workouts: [...state.workouts, workout] })),
  removeWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id),
    })),
  updateWorkout: (id, updatedWorkout) =>
    set((state) => ({
      workouts: state.workouts.map((w) =>
        w.id === id ? { ...w, ...updatedWorkout } : w
      ),
    })),
}));