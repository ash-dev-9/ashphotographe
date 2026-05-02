import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function LensModel({ mouseX, mouseY }) {
  const groupRef = useRef();
  const outerBarrelRef = useRef();
  const innerBarrelRef = useRef();
  const apertureGroupRef = useRef();
  const frontElementRef = useRef();
  const rearElementRef = useRef();
  const focusRingRef = useRef();

  const smoothMouse = useRef({ x: 0, y: 0 });

  const materials = useMemo(() => ({
    bodyMetal: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.2,
      metalness: 0.95,
    }),
    barrelMetal: new THREE.MeshStandardMaterial({
      color: '#2a2a2a',
      roughness: 0.25,
      metalness: 0.9,
    }),
    blackCoating: new THREE.MeshStandardMaterial({
      color: '#0a0a0a',
      roughness: 0.3,
      metalness: 0.8,
    }),
    goldAccent: new THREE.MeshStandardMaterial({
      color: '#c9a96e',
      roughness: 0.15,
      metalness: 0.95,
      emissive: '#c9a96e',
      emissiveIntensity: 0.05,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#1a2535',
      roughness: 0.02,
      metalness: 0.95,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      transmission: 0.6,
      ior: 1.5,
      reflectivity: 1,
    }),
    apertureBlade: new THREE.MeshStandardMaterial({
      color: '#111111',
      roughness: 0.3,
      metalness: 0.9,
    }),
    rubber: new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      roughness: 0.9,
      metalness: 0.05,
    }),
  }), []);

  // Aperture blade positions (6 blades)
  const apertureBlades = useMemo(() => {
    const blades = [];
    const bladeCount = 6;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      blades.push({ angle, initialRotation: angle });
    }
    return blades;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    smoothMouse.current.x += (mouseX - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (mouseY - smoothMouse.current.y) * 0.03;

    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02;
    }

    if (outerBarrelRef.current) {
      outerBarrelRef.current.rotation.y = mx * 0.3;
      outerBarrelRef.current.rotation.x = -my * 0.1;
    }

    if (innerBarrelRef.current) {
      innerBarrelRef.current.rotation.y = mx * 0.5 + time * 0.1;
    }

    if (apertureGroupRef.current) {
      // Aperture breathing animation
      const apertureSize = 0.04 + Math.sin(time * 0.5) * 0.015;
      apertureGroupRef.current.children.forEach((blade, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * apertureSize;
        const y = Math.sin(angle) * apertureSize;
        blade.position.x = x;
        blade.position.y = y;
        blade.rotation.z = angle + Math.PI / 2;
      });
    }

    if (frontElementRef.current) {
      frontElementRef.current.rotation.y = time * 0.05;
    }

    if (rearElementRef.current) {
      rearElementRef.current.rotation.y = -time * 0.03;
    }

    if (focusRingRef.current) {
      focusRingRef.current.rotation.y = mx * 0.4 + time * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      {/* Outer Lens Barrel */}
      <group ref={outerBarrelRef}>
        <mesh material={materials.barrelMetal} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.6, 32]} />
        </mesh>

        {/* Focus ring (rubber grip) */}
        <group ref={focusRingRef} position={[0, 0.15, 0]}>
          <mesh material={materials.rubber}>
            <cylinderGeometry args={[0.36, 0.36, 0.15, 32]} />
          </mesh>
          {/* Focus distance markers */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((angle * Math.PI) / 180) * 0.37,
                0,
                Math.sin((angle * Math.PI) / 180) * 0.37,
              ]}
              material={materials.goldAccent}
            >
              <boxGeometry args={[0.02, 0.08, 0.01]} />
            </mesh>
          ))}
        </group>

        {/* Aperture ring */}
        <mesh position={[0, -0.05, 0]} material={materials.barrelMetal}>
          <cylinderGeometry args={[0.34, 0.34, 0.1, 32]} />
        </mesh>

        {/* Aperture markings */}
        {['1.4', '2', '2.8', '4', '5.6', '8', '11', '16'].map((mark, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.35,
                -0.05,
                Math.sin(angle) * 0.35,
              ]}
              rotation={[0, -angle, 0]}
              material={materials.goldAccent}
            >
              <boxGeometry args={[0.01, 0.01, 0.03]} />
            </mesh>
          );
        })}

        {/* Front lens element */}
        <group ref={frontElementRef} position={[0, 0.31, 0]}>
          <mesh material={materials.glass}>
            <cylinderGeometry args={[0.28, 0.28, 0.05, 32]} />
          </mesh>
          {/* Lens coating reflection */}
          <mesh position={[0, 0.026, 0]} material={materials.bodyMetal}>
            <ringGeometry args={[0.15, 0.28, 32]} />
          </mesh>
        </group>

        {/* Rear lens element */}
        <group ref={rearElementRef} position={[0, -0.31, 0]}>
          <mesh material={materials.glass}>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 32]} />
          </mesh>
        </group>

        {/* Lens mount */}
        <mesh position={[0, -0.35, 0]} material={materials.blackCoating}>
          <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
        </mesh>

        {/* Mounting pins */}
        {[0, 120, 240].map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.32,
              -0.35,
              Math.sin((angle * Math.PI) / 180) * 0.32,
            ]}
            material={materials.goldAccent}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
          </mesh>
        ))}

        {/* Aperture blades (iris) */}
        <group ref={apertureGroupRef}>
          {apertureBlades.map((blade, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(blade.angle) * 0.04,
                0,
                Math.sin(blade.angle) * 0.04,
              ]}
              rotation={[0, 0, blade.initialRotation + Math.PI / 2]}
              material={materials.apertureBlade}
            >
              <boxGeometry args={[0.02, 0.12, 0.005]} />
            </mesh>
          ))}
        </group>

        {/* Brand ring accent */}
        <mesh position={[0, 0.08, 0.351]} material={materials.goldAccent}>
          <ringGeometry args={[0.2, 0.25, 32]} />
        </mesh>

        {/* Inner barrel (moving element) */}
        <group ref={innerBarrelRef}>
          <mesh position={[0, 0, 0]} material={materials.blackCoating}>
            <cylinderGeometry args={[0.28, 0.28, 0.5, 32]} />
          </mesh>
        </group>
      </group>

      {/* Floating light particles around lens */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.6 + Math.sin(i) * 0.2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + i * 0.5) * radius,
              Math.sin(i * 0.3) * 0.2,
              Math.sin(angle + i * 0.5) * radius,
            ]}
            material={materials.goldAccent}
            scale={0.015}
          >
            <sphereGeometry args={[1, 8, 8]} />
          </mesh>
        );
      })}
    </group>
  );
}
