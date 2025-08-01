import { useEffect } from 'react';
import { useMatrixEngineWGPU } from '../MatrixEngineProvider';
import { downloadMeshes } from 'matrix-engine-wgpu';
import { MeshProps } from '../types';

export const Cube: React.FC<MeshProps>=({
  name="myCube1",
  position=[0, 1, -5],
  physics=undefined,
  rotation=[0, 0, 0],
  rotationSpeed=[0, 0, 0],
  texturePath='/res/meshes/cube.png',
  scale=[1,1,1],
  raycast=undefined }) => {

  const engine=useMatrixEngineWGPU();

  useEffect(() => {
    const handleAmmoReady=() => {
      // your logic when Ammo is ready
      downloadMeshes({
        cube: "./res/meshes/cube.obj",
      }, (m) => {
        engine.addMeshObj({
          position: { x: position[0], y: position[1], z: position[2] },
          rotation: { x: rotation[0], y: rotation[1], z: rotation[2] },
          rotationSpeed: { x: rotationSpeed[0], y: rotationSpeed[1], z: rotationSpeed[2] },
          texturesPaths: [texturePath],
          name: name,
          mesh: m.cube,
          physics: physics,
          raycast: raycast
        })
      }, { scale: scale });
    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: true });
    return () => {
      window.removeEventListener('AmmoReady', handleAmmoReady);
    };
  }, []);
  return null;
};

export { MeshProps };