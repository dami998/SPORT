import React from 'react';
import { Minus } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Exercise } from '../../types/workout';

interface ExerciseItemProps {
  exercise: Exercise;
  onUpdate: (id: string, updates: Partial<Exercise>) => void;
  onRemove: (id: string) => void;
}

export function ExerciseItem({ exercise, onUpdate, onRemove }: ExerciseItemProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="flex justify-between">
        <Input
          type="text"
          placeholder="Nom de l'exercice"
          value={exercise.name}
          onChange={(e) => onUpdate(exercise.id, { name: e.target.value })}
          className="flex-1 mr-2"
        />
        <Button
          variant="danger"
          size="sm"
          icon={<Minus className="h-5 w-5" />}
          onClick={() => onRemove(exercise.id)}
          aria-label="Supprimer l'exercice"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          min="1"
          label="Séries"
          value={exercise.sets}
          onChange={(e) => onUpdate(exercise.id, { sets: Number(e.target.value) })}
        />
        <Input
          type="number"
          min="1"
          label="Répétitions"
          value={exercise.reps}
          onChange={(e) => onUpdate(exercise.id, { reps: Number(e.target.value) })}
        />
        <Input
          type="number"
          min="0"
          step="0.5"
          label="Poids (kg)"
          value={exercise.weight}
          onChange={(e) => onUpdate(exercise.id, { weight: Number(e.target.value) })}
        />
      </div>
    </div>
  );
}