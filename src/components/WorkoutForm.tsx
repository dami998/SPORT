import React, { useState } from 'react';
import { Plus, Minus, Save } from 'lucide-react';
import { useWorkoutStore } from '../stores/workoutStore';
import type { Exercise } from '../types/workout';

export function WorkoutForm() {
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(60);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, ...updates } : ex
    ));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkout({
      id: crypto.randomUUID(),
      name: workoutName,
      date: new Date(date),
      exercises,
      duration,
    });
    
    // Reset form
    setWorkoutName('');
    setExercises([]);
    setDuration(60);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom de l'entraînement
          </label>
          <input
            type="text"
            required
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée (minutes)
          </label>
          <input
            type="number"
            required
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Exercices</h3>
          <button
            type="button"
            onClick={addExercise}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter un exercice
          </button>
        </div>

        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Nom de l'exercice"
                value={exercise.name}
                onChange={(e) => updateExercise(exercise.id, { name: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeExercise(exercise.id)}
                className="ml-2 text-red-600 hover:text-red-700"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Séries</label>
                <input
                  type="number"
                  min="1"
                  value={exercise.sets}
                  onChange={(e) => updateExercise(exercise.id, { sets: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Répétitions</label>
                <input
                  type="number"
                  min="1"
                  value={exercise.reps}
                  onChange={(e) => updateExercise(exercise.id, { reps: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Poids (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={exercise.weight}
                  onChange={(e) => updateExercise(exercise.id, { weight: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Enregistrer l'entraînement
        </button>
      </div>
    </form>
  );
}