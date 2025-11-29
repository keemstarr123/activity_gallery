import React from 'react';
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export interface MemoryEvent {
  id: string;
  timestamp: string;
  title: string;
  type: 'onboarding' | 'order' | 'achievement' | 'interaction' | 'event' | 'reward' | 'action' | 'milestone' | 'alert' | 'summary';
  thumbnailUrl?: string;
  description?: string;
  metadata?: Record<string, any>;
  voxelModel: string; // Filename reference (used to pick shape in this demo)
}

export interface GameState {
  hasStarted: boolean;
  progress: number; // 0 to 1
  targetProgress: number;
  activeEventId: string | null;
  setStarted: (started: boolean) => void;
  setTargetProgress: (val: number) => void;
  setActiveEventId: (id: string | null) => void;
  nextEvent: () => void;
  prevEvent: () => void;
}