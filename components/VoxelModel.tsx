import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../constants';
import { MemoryEvent } from '../types';

interface VoxelModelProps {
  type: MemoryEvent['type'];
  title?: string;
  id?: string;
  color: string;
  isHovered: boolean;
  isActive: boolean;
}

const MaterialConfig = {
  roughness: 0.2,
  metalness: 0.1,
  emissiveIntensity: 0.2
};

// --- Helper for Generative Voxels ---
// A simple pseudo-random number generator based on a seed string
const seededRandom = (seed: string) => {
  let h = 0xdeadbeef;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  }
  return () => {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h >>> 0) / 4294967296;
  };
};

const GenerativeVoxelShape = ({ seed, color, emissive }: { seed: string, color: string, emissive: THREE.Color }) => {
    const voxels = useMemo(() => {
        const rand = seededRandom(seed);
        const coords: [number, number, number][] = [];
        const dim = 4; // 4x4x4 grid effective
        
        // Always add core
        coords.push([0, 0, 0]);
        coords.push([0, 1, 0]);

        for (let x = 0; x <= 2; x++) {
            for (let y = -2; y <= 2; y++) {
                for (let z = 0; z <= 2; z++) {
                    // Higher probability near center
                    const dist = Math.abs(x) + Math.abs(y) + Math.abs(z);
                    if (rand() > (dist * 0.15 + 0.2)) {
                        coords.push([x, y, z]);
                        if (x !== 0) coords.push([-x, y, z]); // Symmetry X
                        if (z !== 0) coords.push([x, y, -z]); // Symmetry Z
                        if (x !== 0 && z !== 0) coords.push([-x, y, -z]);
                    }
                }
            }
        }
        return coords;
    }, [seed]);

    return (
        <group scale={[0.25, 0.25, 0.25]}>
            {voxels.map((pos, i) => (
                <mesh key={i} position={[pos[0], pos[1], pos[2]]}>
                    <boxGeometry args={[0.95, 0.95, 0.95]} />
                    <meshStandardMaterial color={color} {...MaterialConfig} emissive={emissive} />
                </mesh>
            ))}
        </group>
    );
};

// --- Intricate Composite Models ---

const NasiLemakVoxel = ({ activeEmissive }: { activeEmissive: THREE.Color }) => (
    <group scale={[0.8, 0.8, 0.8]} position={[0, -0.2, 0]}>
        {/* Banana Leaf Base */}
        <mesh position={[0, -0.6, 0]} rotation={[0.1, 0.1, 0]}>
             <cylinderGeometry args={[1.8, 1.8, 0.1, 6]} />
             <meshStandardMaterial color="#166534" roughness={0.8} />
        </mesh>
        {/* Rice Pyramid */}
        <mesh position={[0, 0.2, 0]}>
             <coneGeometry args={[1, 1.5, 4]} />
             <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>
        {/* Sambal Voxel */}
        <mesh position={[0.6, -0.3, 0.6]}>
            <boxGeometry args={[0.5, 0.3, 0.5]} />
            <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Cucumber slices */}
        <mesh position={[-0.8, -0.3, 0.5]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
            <meshStandardMaterial color="#4ade80" />
        </mesh>
        <mesh position={[-0.6, -0.3, 0.8]} rotation={[0.1, 0.4, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
            <meshStandardMaterial color="#4ade80" />
        </mesh>
         {/* Egg */}
         <mesh position={[0, -0.3, -0.8]} rotation={[0, 0, 1.57]}>
            <capsuleGeometry args={[0.25, 0.5, 4, 8]} />
            <meshStandardMaterial color="#fff" />
        </mesh>
         <mesh position={[0, -0.3, -0.8]} rotation={[0, 0, 1.57]}>
            <sphereGeometry args={[0.2]} />
            <meshStandardMaterial color="#facc15" />
        </mesh>
    </group>
);

const DetailedShoppingBag = ({ color, activeEmissive }: { color: string, activeEmissive: THREE.Color }) => (
    <group scale={[0.8, 0.8, 0.8]}>
        {/* Bag Body */}
        <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.4, 1.6, 0.6]} />
            <meshStandardMaterial color={color} {...MaterialConfig} emissive={activeEmissive} />
        </mesh>
        {/* Stripes */}
        <mesh position={[0, -0.2, 0.05]}>
            <boxGeometry args={[1.42, 0.2, 0.62]} />
            <meshStandardMaterial color="#fff" />
        </mesh>
        {/* Handles */}
        <mesh position={[0, 0.8, 0]}>
            <torusGeometry args={[0.3, 0.05, 8, 20, Math.PI]} />
            <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Stuffing/Items inside */}
        <mesh position={[0.3, 0.85, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-0.2, 0.85, 0]} rotation={[0, 0, -0.1]}>
             <cylinderGeometry args={[0.1, 0.1, 0.5]} />
             <meshStandardMaterial color="#ef4444" />
        </mesh>
    </group>
);

const DetailedTrophy = ({ color, activeEmissive }: { color: string, activeEmissive: THREE.Color }) => (
    <group scale={[0.9, 0.9, 0.9]} position={[0, 0.2, 0]}>
        {/* Base */}
        <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.6, 0.7, 0.2, 8]} />
            <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.3, 0.8, 16, 1, true]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} emissive={activeEmissive} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.35, 0]}>
             <sphereGeometry args={[0.31]} />
             <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handles */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.25, 0.08, 8, 16]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.8} />
        </mesh>
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.25, 0.08, 8, 16]} />
            <meshStandardMaterial color="#fcd34d" metalness={0.8} />
        </mesh>
        {/* Star */}
        <mesh position={[0, 0.8, 0]}>
             <octahedronGeometry args={[0.3]} />
             <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} />
        </mesh>
    </group>
);

const DetailedGift = ({ color, activeEmissive }: { color: string, activeEmissive: THREE.Color }) => (
    <group>
        {/* Box */}
        <mesh>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial color={color} {...MaterialConfig} emissive={activeEmissive} />
        </mesh>
        {/* Ribbon Vertical */}
        <mesh scale={[1.02, 1.02, 1.02]}>
            <boxGeometry args={[0.3, 1.2, 1.2]} />
            <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Ribbon Horizontal */}
        <mesh scale={[1.02, 1.02, 1.02]}>
            <boxGeometry args={[1.2, 1.2, 0.3]} />
            <meshStandardMaterial color="#ef4444" />
        </mesh>
        {/* Bow */}
        <group position={[0, 0.6, 0]}>
            <mesh position={[0.2, 0.15, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[-0.2, 0.15, 0]} rotation={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
        </group>
    </group>
);

const FireworksVoxel = ({ color }: { color: string }) => {
    return (
        <group>
            {[...Array(8)].map((_, i) => (
                <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 2.5]} />
                    <meshBasicMaterial color={Math.random() > 0.5 ? color : '#fff'} />
                </mesh>
            ))}
             <mesh>
                <icosahedronGeometry args={[0.5]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
             </mesh>
        </group>
    )
}

export const VoxelModel: React.FC<VoxelModelProps> = ({ type, title, id = 'default', color, isHovered, isActive }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Idle animation
      meshRef.current.rotation.y += delta * (isActive ? 1.0 : 0.2);
      meshRef.current.position.y = Math.sin(time * 1.5) * 0.2;
      
      if (isHovered) {
         meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
         meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const baseColor = new THREE.Color(color);
  const activeEmissive = isActive ? baseColor.clone().multiplyScalar(0.5) : new THREE.Color(0x000000);

  // Helper to determine render logic
  const renderShape = () => {
    // Special Case: Nasi Lemak title detection
    if (title?.toLowerCase().includes('nasi lemak')) {
        return <NasiLemakVoxel activeEmissive={activeEmissive} />;
    }

    switch (type) {
      case 'order': 
        return <DetailedShoppingBag color={color} activeEmissive={activeEmissive} />;
      case 'achievement': 
        return <DetailedTrophy color={color} activeEmissive={activeEmissive} />;
      case 'reward':
        return <DetailedGift color={color} activeEmissive={activeEmissive} />;
      case 'summary':
          return <FireworksVoxel color={color} />;
      case 'milestone': 
      case 'event':
      case 'interaction':
      case 'action':
      case 'onboarding':
      default:
        // Use AI-like procedural generation for these generic events
        return <GenerativeVoxelShape seed={id} color={color} emissive={activeEmissive} />;
    }
  };

  return (
    <group ref={meshRef}>
      {renderShape()}
      {/* Ground shadow */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="#000" opacity={0.15} transparent />
      </mesh>
    </group>
  );
};