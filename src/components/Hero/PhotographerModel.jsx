import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PhotographerModel({ mouseX, mouseY }) {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();
  const rightArmRef = useRef();
  const leftArmRef = useRef();
  const cameraGroupRef = useRef();

  const smoothMouse = useRef({ x: 0, y: 0 });

  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.35,
      metalness: 0.65,
    }),
    skin: new THREE.MeshStandardMaterial({
      color: '#c4a882',
      roughness: 0.55,
      metalness: 0.08,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: '#c9a96e',
      roughness: 0.25,
      metalness: 0.82,
    }),
    dark: new THREE.MeshStandardMaterial({
      color: '#0d0d0d',
      roughness: 0.28,
      metalness: 0.72,
    }),
    hair: new THREE.MeshStandardMaterial({
      color: '#1a1410',
      roughness: 0.75,
      metalness: 0.08,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#1a2030',
      roughness: 0.04,
      metalness: 0.92,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      reflectivity: 1,
    }),
    cameraMetal: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      roughness: 0.18,
      metalness: 0.92,
    }),
    lensRing: new THREE.MeshStandardMaterial({
      color: '#c9a96e',
      roughness: 0.12,
      metalness: 0.95,
      emissive: '#c9a96e',
      emissiveIntensity: 0.06,
    }),
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    smoothMouse.current.x += (mouseX - smoothMouse.current.x) * 0.035;
    smoothMouse.current.y += (mouseY - smoothMouse.current.y) * 0.035;

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.025 - 1.6;
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.008;
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y = mx * 0.1;
      bodyRef.current.rotation.x = -my * 0.035;
    }

    if (headRef.current) {
      headRef.current.rotation.y = mx * 0.3;
      headRef.current.rotation.x = -my * 0.12;
      headRef.current.rotation.z = -mx * 0.04;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.28 + mx * 0.07;
      rightArmRef.current.rotation.x = my * 0.08;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.38 - mx * 0.05;
      leftArmRef.current.rotation.x = my * 0.06;
    }

    if (cameraGroupRef.current) {
      cameraGroupRef.current.rotation.y = mx * 0.22;
      cameraGroupRef.current.rotation.x = -my * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.6, 0]}>
      <group ref={bodyRef}>
        <mesh position={[0, 1.6, 0]} material={materials.body} castShadow>
          <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        </mesh>

        <mesh position={[0, 2.05, 0.05]} material={materials.dark}>
          <cylinderGeometry args={[0.28, 0.32, 0.15, 16]} />
        </mesh>

        <mesh position={[0, 1.15, 0]} material={materials.accent}>
          <cylinderGeometry args={[0.31, 0.31, 0.04, 16]} />
        </mesh>

        <mesh position={[0, 0.75, 0]} material={materials.body} castShadow>
          <capsuleGeometry args={[0.28, 0.5, 8, 16]} />
        </mesh>

        <mesh position={[-0.15, 0.2, 0]} material={materials.dark} castShadow>
          <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
        </mesh>

        <mesh position={[0.15, 0.18, 0.05]} material={materials.dark} castShadow>
          <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
        </mesh>

        <mesh position={[-0.15, -0.12, 0.05]} material={materials.accent}>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
        </mesh>
        <mesh position={[0.15, -0.14, 0.08]} material={materials.accent}>
          <boxGeometry args={[0.12, 0.06, 0.2]} />
        </mesh>

        <group ref={headRef} position={[0, 2.35, 0]}>
          <mesh material={materials.skin} castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
          </mesh>

          <mesh position={[0, 0.08, -0.02]} material={materials.hair}>
            <sphereGeometry args={[0.21, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          </mesh>

          <mesh position={[0, -0.2, 0]} material={materials.skin}>
            <cylinderGeometry args={[0.08, 0.1, 0.12, 12]} />
          </mesh>

          <mesh position={[-0.06, 0.03, 0.18]} material={materials.dark}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
          <mesh position={[0.06, 0.03, 0.18]} material={materials.dark}>
            <sphereGeometry args={[0.02, 8, 8]} />
          </mesh>
        </group>

        <group ref={rightArmRef} position={[0.35, 1.9, 0]}>
          <mesh position={[0.1, -0.15, 0.1]} rotation={[0.3, 0, -0.6]} material={materials.body} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 6, 12]} />
          </mesh>

          <mesh position={[0.15, -0.35, 0.25]} rotation={[0.8, 0, -0.3]} material={materials.body} castShadow>
            <capsuleGeometry args={[0.055, 0.28, 6, 12]} />
          </mesh>

          <mesh position={[0.1, -0.48, 0.4]} material={materials.skin}>
            <sphereGeometry args={[0.05, 8, 8]} />
          </mesh>
        </group>

        <group ref={leftArmRef} position={[-0.35, 1.9, 0]}>
          <mesh position={[-0.08, -0.15, 0.15]} rotation={[0.5, 0, 0.5]} material={materials.body} castShadow>
            <capsuleGeometry args={[0.06, 0.3, 6, 12]} />
          </mesh>

          <mesh position={[-0.05, -0.38, 0.32]} rotation={[1, 0, 0.2]} material={materials.body} castShadow>
            <capsuleGeometry args={[0.055, 0.25, 6, 12]} />
          </mesh>

          <mesh position={[0, -0.48, 0.42]} material={materials.skin}>
            <sphereGeometry args={[0.05, 8, 8]} />
          </mesh>
        </group>

        <group ref={cameraGroupRef} position={[0.08, 1.42, 0.42]}>
          <mesh material={materials.cameraMetal} castShadow>
            <boxGeometry args={[0.28, 0.18, 0.16]} />
          </mesh>

          <mesh position={[0, 0.11, -0.02]} material={materials.cameraMetal}>
            <boxGeometry args={[0.18, 0.06, 0.1]} />
          </mesh>

          <mesh position={[0, 0.12, -0.06]} material={materials.dark}>
            <boxGeometry args={[0.06, 0.04, 0.04]} />
          </mesh>

          <mesh position={[0, 0.15, 0]} material={materials.accent}>
            <boxGeometry args={[0.05, 0.015, 0.03]} />
          </mesh>

          <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]} material={materials.dark}>
            <cylinderGeometry args={[0.08, 0.1, 0.12, 20]} />
          </mesh>

          <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]} material={materials.lensRing}>
            <torusGeometry args={[0.085, 0.008, 8, 24]} />
          </mesh>

          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} material={materials.glass}>
            <circleGeometry args={[0.07, 24]} />
          </mesh>

          <mesh position={[0, 0, 0.19]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.04, 0.065, 24]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.08} metalness={0.92} />
          </mesh>

          <mesh position={[0.15, -0.02, 0]} material={materials.dark}>
            <boxGeometry args={[0.04, 0.16, 0.14]} />
          </mesh>

          <mesh position={[-0.15, 0.06, 0]} material={materials.accent}>
            <torusGeometry args={[0.015, 0.004, 6, 12]} />
          </mesh>
          <mesh position={[0.15, 0.06, 0]} material={materials.accent}>
            <torusGeometry args={[0.015, 0.004, 6, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
