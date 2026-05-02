import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function StudioEnvironment() {
  const spotRef1 = useRef();
  const spotRef2 = useRef();
  const ambientRef = useRef();
  const rimLightRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (spotRef1.current) {
      spotRef1.current.intensity = 35 + Math.sin(time * 0.5) * 8;
    }
    if (spotRef2.current) {
      spotRef2.current.intensity = 25 + Math.sin(time * 0.7 + 1) * 5;
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = 0.12 + Math.sin(time * 0.3) * 0.03;
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = 12 + Math.sin(time * 0.8) * 3;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#0a0a0a', 6, 18]} />

      <ambientLight ref={ambientRef} intensity={0.12} color="#99aabb" />

      <spotLight
        ref={spotRef1}
        position={[4, 5, 4]}
        angle={0.45}
        penumbra={0.9}
        intensity={35}
        color="#ffe8d0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-bias={-0.001}
      />

      <spotLight
        ref={spotRef2}
        position={[-3, 4, 3]}
        angle={0.55}
        penumbra={0.95}
        intensity={25}
        color="#b8c8e8"
      />

      <pointLight
        ref={rimLightRef}
        position={[0, 3.5, -4]}
        intensity={12}
        color="#c9a96e"
        distance={12}
        decay={2}
      />

      <pointLight
        position={[0, -2, 3]}
        intensity={4}
        color="#223344"
        distance={10}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.12}
          metalness={0.85}
          envMapIntensity={0.6}
        />
      </mesh>

      {[
        { pos: [-3.5, 1.2, -4.5], rot: [0, 0.35, 0], scale: [2.5, 4.5, 0.04], color: '#0e0e0e' },
        { pos: [0, 1.8, -5], rot: [0, 0, 0], scale: [3.5, 5.5, 0.04], color: '#0c0c0c' },
        { pos: [3.5, 1.2, -4.5], rot: [0, -0.35, 0], scale: [2.5, 4.5, 0.04], color: '#0e0e0e' },
        { pos: [5, 0.8, -2.5], rot: [0, -0.9, 0], scale: [1.8, 4, 0.04], color: '#101010' },
        { pos: [-5, 0.8, -2.5], rot: [0, 0.9, 0], scale: [1.8, 4, 0.04], color: '#101010' },
      ].map((panel, i) => (
        <mesh key={i} position={panel.pos} rotation={panel.rot} scale={panel.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={panel.color}
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>
      ))}

      <mesh position={[-2.8, 3.5, -4.2]} rotation={[0, 0.35, 0]}>
        <planeGeometry args={[0.015, 2.5]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.25} />
      </mesh>
      <mesh position={[2.8, 3.5, -4.2]} rotation={[0, -0.35, 0]}>
        <planeGeometry args={[0.015, 2.5]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.25} />
      </mesh>

      <mesh position={[0, 4.5, -4.8]} rotation={[0.1, 0, 0]}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.4} />
      </mesh>
    </>
  );
}
