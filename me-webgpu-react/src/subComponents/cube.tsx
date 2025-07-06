import { useEffect } from 'react';
import { useMatrixEngineWGPU } from '../MatrixEngineContext';
import { downloadMeshes } from 'matrix-engine-wgpu';

type CubeProps={
  position: [number, number, number];
  color?: string;
};

export const Cube: React.FC<CubeProps>=({ position, color='white' }) => {
  const engine=useMatrixEngineWGPU();

  useEffect(() => {
    const handleAmmoReady=() => {
      console.log('Ammo.js is ready!');
      // your logic when Ammo is ready

      downloadMeshes({
        cube: "./res/meshes/cube.obj",
      }, (m) => {
        engine.addMeshObj({
          position: { x: 0, y: 2, z: -10 },
          rotation: { x: 0, y: 0, z: 0 },
          rotationSpeed: { x: 0, y: 0, z: 0 },
          texturesPaths: ['/res/meshes/cube.png'],
          name: 'CubePhysics',
          mesh: m.cube,
          physics: {
            enabled: true,
            geometry: "Cube"
          }
        })
      });

    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: true });

    return () => {
      window.removeEventListener('AmmoReady', handleAmmoReady);
    };
  }, []);

  // useEffect(() => {
  //   if(!engine) return;



  //   // const cube = engine.addCube({
  //   //   size: 1,
  //   //   position,
  //   //   color,
  //   //   isPhysics: true,
  //   // });

  //   return () => {
  //     // engine.removeFromScene(cube);
  //   };
  // }, [engine]);

  return null;
};