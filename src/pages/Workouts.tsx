import React from 'react';
import { WorkoutForm } from '../components/WorkoutForm';

export function Workouts() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Nouvel Entraînement
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <WorkoutForm />
      </div>
    </div>
  );
}