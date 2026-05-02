import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PhotographerModel } from './PhotographerModel';
import { Particles } from './Particles';
import { StudioEnvironment } from './StudioEnvironment';

export function Scene3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    // Normalize to -1 to 1
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
          position: [0, 0.3, 4],
          fov: 45,
          near: 0.1,
          far: 50
        }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.1,
        }}
        style={{ background: '#0a0a0a' }}
      >
        <Suspense fallback={null}>
          <StudioEnvironment />
          <PhotographerModel mouseX={mouse.x} mouseY={mouse.y} />
          <Particles count={80} />
        </Suspense>
      </Canvas>
    </div>
  );
}
