import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Calendar, Settings, Home } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">FitTrack</span>
          </Link>
          
          <div className="flex space-x-4">
            <NavLink to="/" icon={<Home size={20} />} text="Accueil" />
            <NavLink to="/workouts" icon={<Dumbbell size={20} />} text="Entraînements" />
            <NavLink to="/calendar" icon={<Calendar size={20} />} text="Calendrier" />
            <NavLink to="/settings" icon={<Settings size={20} />} text="Paramètres" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}