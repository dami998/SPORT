import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Workouts } from './pages/Workouts';
import { Calendar } from './pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<div>Paramètres (à venir)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;