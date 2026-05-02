import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { LensModel } from './LensModel';
import { Particles } from './Particles';
import { StudioEnvironment } from './StudioEnvironment';

export function Scene3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  }, []);

  return (
    <div className="hero-canvas-container" onPointerMove={handlePointerMove}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0.3, 3.5],
          fov: 40,
          near: 0.1,
          far: 50
        }}
        gl={{
          antialias: true,
          toneMapping: 3,
          toneMappingExposure: 1.2,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <StudioEnvironment />
          <LensModel mouseX={mouse.x} mouseY={mouse.y} />
          <Particles count={60} />
        </Suspense>
      </Canvas>
    </div>
  );
}
