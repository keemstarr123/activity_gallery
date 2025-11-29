import React, { Suspense } from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-slate-100 overflow-hidden select-none">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-slate-400">Loading Journey...</div>}>
        <Scene />
      </Suspense>
      <Overlay />
    </div>
  );
};

export default App;
