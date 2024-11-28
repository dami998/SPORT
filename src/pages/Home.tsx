import React from 'react';
import { useWorkoutStore } from '../stores/workoutStore';
import { Dumbbell, Trophy, Clock, TrendingUp } from 'lucide-react';

export function Home() {
  const workouts = useWorkoutStore((state) => state.workouts);
  
  const stats = {
    totalWorkouts: workouts.length,
    totalTime: workouts.reduce((acc, w) => acc + w.duration, 0),
    lastWorkout: workouts[workouts.length - 1]?.date,
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Bienvenue sur FitTrack
        </h1>
        <p className="mt-2 text-gray-600">
          Suivez vos progrès et atteignez vos objectifs
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Dumbbell className="h-8 w-8 text-blue-600" />}
          title="Total Entraînements"
          value={stats.totalWorkouts.toString()}
        />
        <StatCard
          icon={<Clock className="h-8 w-8 text-green-600" />}
          title="Temps Total"
          value={`${Math.round(stats.totalTime / 60)}h`}
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8 text-purple-600" />}
          title="Dernier Entraînement"
          value={stats.lastWorkout ? new Date(stats.lastWorkout).toLocaleDateString() : '-'}
        />
        <StatCard
          icon={<Trophy className="h-8 w-8 text-yellow-600" />}
          title="Objectif Hebdo"
          value="3/4"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Commencer un entraînement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <WorkoutButton
            title="Entraînement Rapide"
            description="Séance personnalisée"
            icon={<Dumbbell className="h-6 w-6" />}
          />
          <WorkoutButton
            title="Programme"
            description="Suivre un programme"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <WorkoutButton
            title="Routine"
            description="Répéter une routine"
            icon={<Clock className="h-6 w-6" />}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
      </div>
    </div>
  );
}

function WorkoutButton({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <button className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}