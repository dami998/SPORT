export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface Workout {
  id: string;
  date: Date;
  name: string;
  exercises: Exercise[];
  duration: number;
  notes?: string;
}