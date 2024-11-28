import React from 'react';
import { useWorkoutStore } from '../stores/workoutStore';
import { formatDate, formatTime } from '../utils/dates';
import { Dumbbell } from 'lucide-react';

export function Calendar() {
  const workouts = useWorkoutStore((state) => state.workouts);
  const sortedWorkouts = [...workouts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Calendrier des Entraînements</h1>
      
      <div className="space-y-4">
        {sortedWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                  <p className="text-sm text-gray-500">{formatDate(workout.date)}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatTime(workout.duration)}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Exercices:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-50 p-3 rounded">
                    <p className="font-medium text-gray-900">{exercise.name}</p>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} séries × {exercise.reps} répétitions
                      {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {sortedWorkouts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun entraînement</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par ajouter votre premier entraînement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}