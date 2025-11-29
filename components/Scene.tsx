import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store';
import { TIMELINE_DATA, PATH_CURVE, COLORS } from '../constants';
import { VoxelModel } from './VoxelModel';

const KampungScenery = () => {
    // Procedural generation of environment items
    const items = useMemo(() => {
        const _items = [];
        // Generate Trees
        for(let i=0; i<60; i++) {
            const z = -Math.random() * 150 + 10;
            const x = (Math.random() - 0.5) * 80;
            // Clear path
            if (Math.abs(x) < 8) continue;
            
            const scale = Math.random() * 0.3 + 0.7;
            _items.push({ type: 'tree', position: [x, 0, z], scale });
        }
        // Stilt Houses (Rumah Panggung)
        for(let i=0; i<8; i++) {
             const z = -Math.random() * 120 - 20;
             const x = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 30 + 15);
             _items.push({ type: 'house', position: [x, 2, z] });
        }
        return _items;
    }, []);

    return (
        <group>
            {/* Paddy Field Water Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -60]}>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial 
                    color="#60a5fa" 
                    roughness={0.0} 
                    metalness={0.2} 
                    transparent 
                    opacity={0.5}
                    depthWrite={false} // Fixes z-fighting with tube/shadows
                />
            </mesh>

            {items.map((item, idx) => (
                <group key={idx} position={item.position as [number,number,number]}>
                    {item.type === 'tree' ? (
                        <CoconutTree scale={item.scale as number} />
                    ) : (
                        <StiltHouse />
                    )}
                </group>
            ))}
        </group>
    )
}

const CoconutTree = ({ scale = 1 }) => (
    <group scale={[scale, scale, scale]}>
        {/* Voxel Trunk */}
        <group>
            {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[0, i * 0.5 + 0.25, 0]}>
                    <boxGeometry args={[0.4, 0.5, 0.4]} />
                    <meshStandardMaterial color="#5D4037" />
                </mesh>
            ))}
        </group>

        {/* Voxel Leaves */}
        <group position={[0, 4, 0]}>
            {/* Center */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.4, 0.6]} />
                <meshStandardMaterial color="#388E3C" />
            </mesh>
            
            {/* Coconuts */}
            <mesh position={[0.2, -0.3, 0.2]}>
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshStandardMaterial color="#AFB42B" />
            </mesh>
            <mesh position={[-0.2, -0.2, -0.2]}>
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshStandardMaterial color="#AFB42B" />
            </mesh>

            {/* Fronds extending out */}
            {[0, 1, 2, 3].map((r) => (
                <group key={r} rotation={[0, r * (Math.PI / 2), 0]}>
                    <mesh position={[0.8, 0, 0]}>
                        <boxGeometry args={[1, 0.2, 0.4]} />
                        <meshStandardMaterial color="#4CAF50" />
                    </mesh>
                    <mesh position={[1.4, -0.2, 0]}>
                        <boxGeometry args={[0.6, 0.2, 0.4]} />
                        <meshStandardMaterial color="#4CAF50" />
                    </mesh>
                     <mesh position={[1.8, -0.5, 0]}>
                        <boxGeometry args={[0.4, 0.2, 0.4]} />
                        <meshStandardMaterial color="#4CAF50" />
                    </mesh>
                </group>
            ))}
        </group>
    </group>
)

const StiltHouse = () => (
    <group>
        {/* Stilts */}
        <mesh position={[-2, -1, -2]}> <boxGeometry args={[0.2, 4, 0.2]} /> <meshStandardMaterial color="#573622" /> </mesh>
        <mesh position={[2, -1, -2]}> <boxGeometry args={[0.2, 4, 0.2]} /> <meshStandardMaterial color="#573622" /> </mesh>
        <mesh position={[-2, -1, 2]}> <boxGeometry args={[0.2, 4, 0.2]} /> <meshStandardMaterial color="#573622" /> </mesh>
        <mesh position={[2, -1, 2]}> <boxGeometry args={[0.2, 4, 0.2]} /> <meshStandardMaterial color="#573622" /> </mesh>
        
        {/* Main Room */}
        <mesh position={[0, 2, 0]}>
            <boxGeometry args={[5, 3, 5]} />
            <meshStandardMaterial color="#a16207" />
        </mesh>
        
        {/* Roof */}
        <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI/4, 0]}>
            <coneGeometry args={[4.5, 2.5, 4]} />
            <meshStandardMaterial color="#713f12" />
        </mesh>
    </group>
)

const MalaysianLandmarks = () => {
    return (
        <group position={[20, -10, -180]} rotation={[0, -0.2, 0]}>
            {/* Stylized Far BG Skyline */}
            <group position={[-15, 0, 0]}>
                {/* Tower 1 */}
                <mesh position={[-4, 25, 0]}>
                    <cylinderGeometry args={[2.5, 3.5, 50, 8]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                {/* Tower 2 */}
                <mesh position={[4, 25, 0]}>
                    <cylinderGeometry args={[2.5, 3.5, 50, 8]} />
                    <meshStandardMaterial color="#94a3b8" />
                </mesh>
                <mesh position={[0, 22, 0]}>
                    <boxGeometry args={[6, 1, 1]} />
                    <meshStandardMaterial color="#cbd5e1" />
                </mesh>
            </group>
            
            {/* KL Tower */}
            <group position={[15, 0, 20]}>
                <mesh position={[0, 20, 0]}>
                    <cylinderGeometry args={[0.8, 1.2, 45, 8]} />
                    <meshStandardMaterial color="#cbd5e1" />
                </mesh>
                <mesh position={[0, 42, 0]}>
                    <dodecahedronGeometry args={[3]} />
                    <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.2} />
                </mesh>
            </group>
        </group>
    )
}

const SceneContent: React.FC = () => {
  const { progress, targetProgress, setTargetProgress, setActiveEventId, activeEventId, hasStarted } = useStore();
  const { camera } = useThree();
  
  // Event listeners for scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!hasStarted) return;
      const delta = e.deltaY * 0.0005; 
      setTargetProgress(useStore.getState().targetProgress + delta);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; }
    const handleTouchMove = (e: TouchEvent) => {
        if (!hasStarted) return;
        const delta = (touchStartY - e.touches[0].clientY) * 0.002;
        touchStartY = e.touches[0].clientY;
        setTargetProgress(useStore.getState().targetProgress + delta);
    }

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [hasStarted, setTargetProgress]);

  // Main Game Loop
  useFrame((state, delta) => {
    if (!hasStarted) {
        const t = state.clock.getElapsedTime();
        camera.position.x = Math.sin(t * 0.2) * 5;
        camera.position.y = 5 + Math.cos(t * 0.3) * 2;
        camera.position.z = 20;
        camera.lookAt(0,0,0);
        return;
    }

    const currentProgress = THREE.MathUtils.lerp(useStore.getState().progress, targetProgress, delta * 3);
    useStore.setState({ progress: currentProgress });

    const position = PATH_CURVE.getPointAt(currentProgress);
    const lookAtPoint = PATH_CURVE.getPointAt(Math.min(currentProgress + 0.05, 1));
    
    // Smooth camera follow
    camera.position.lerp(new THREE.Vector3(position.x, position.y + 4, position.z + 12), delta * 2);
    camera.lookAt(lookAtPoint);

    // Active event detection
    let closestDist = Infinity;
    let closestId: string | null = null;

    TIMELINE_DATA.forEach((item, index) => {
        const itemPos = PATH_CURVE.getPointAt(index / (TIMELINE_DATA.length - 1));
        const dist = position.distanceTo(itemPos);
        if (dist < 4) { 
            closestDist = dist;
            closestId = item.id;
        }
    });

    if (closestId !== activeEventId) {
        setActiveEventId(closestId);
    }
  });

  return (
    <>
      <color attach="background" args={['#dbeafe']} />
      <ambientLight intensity={0.6} color="#dbeafe" />
      <directionalLight 
        position={[50, 50, 20]} 
        intensity={1.2} 
        castShadow 
        color="#fff7ed" // Warm sunlight
        shadow-bias={-0.0001} 
      />
      <hemisphereLight args={['#bae6fd', '#f0f9ff', 0.8]} />

      {/* Extended Fog to reveal Landmarks */}
      <fog attach="fog" args={['#dbeafe', 30, 200]} />
      
      {/* Sky/Clouds removed for stability */}

      <KampungScenery />
      <MalaysianLandmarks />

      {/* Timeline Objects */}
      {TIMELINE_DATA.map((item, index) => {
        const position = PATH_CURVE.getPointAt(index / (TIMELINE_DATA.length - 1));
        const isActive = activeEventId === item.id;
        
        return (
          <group key={item.id} position={position}>
             <EventNode item={item} isActive={isActive} />
          </group>
        );
      })}

      <TimelineTube />

      {/* Magic Particles */}
      <Sparkles count={200} scale={120} size={8} speed={0.4} opacity={0.5} color="#fbbf24" />
      
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.2} radius={0.5} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </>
  );
};

const EventNode = ({ item, isActive }: { item: any, isActive: boolean }) => {
    const [hovered, setHover] = useState(false);
    const { setActiveEventId, setTargetProgress } = useStore();
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            const targetScale = isActive ? 1.5 : (hovered ? 1.2 : 1);
            // Smooth scale transition
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
        }
        if (textRef.current) {
            textRef.current.lookAt(state.camera.position);
        }
    });

    const handleClick = () => {
        const idx = TIMELINE_DATA.findIndex(d => d.id === item.id);
        const prog = idx / (TIMELINE_DATA.length - 1);
        setTargetProgress(prog);
        setActiveEventId(item.id);
    };

    return (
        <group 
            ref={groupRef} 
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
        >
            <VoxelModel 
                type={item.type} 
                title={item.title}
                id={item.id}
                color={COLORS[item.type as keyof typeof COLORS] || COLORS.order} 
                isActive={isActive}
                isHovered={hovered}
            />
            
            <group position={[0, 2, 0]} ref={textRef}>
                <Text 
                    color="#1e293b" 
                    fontSize={0.35} 
                    anchorX="center" 
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                    {item.title}
                </Text>
            </group>
        </group>
    )
}

const TimelineTube = () => {
    const geometry = useMemo(() => {
        return new THREE.TubeGeometry(PATH_CURVE, 200, 0.15, 8, false);
    }, []);

    return (
        <mesh geometry={geometry} position={[0, -1, 0]}>
             <meshStandardMaterial 
                color="#bae6fd" 
                transparent 
                opacity={0.6} 
                roughness={0.2}
                depthWrite={false} // Prevent occlusion issues
            />
        </mesh>
    );
};

export const Scene: React.FC = () => {
  return (
    <Canvas 
      shadows
      dpr={[1, 2]} 
      camera={{ position: [0, 5, 20], fov: 45 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, background: '#dbeafe' }}
    >
      <SceneContent />
    </Canvas>
  );
};