import { useEffect } from 'react';
import { useMatrixEngineWGPU } from '../MatrixEngineContext';
import { downloadMeshes } from 'matrix-engine-wgpu';
export const Cube = ({ name = "myCube1", position, physics, rotation, color = 'white' }) => {
    const engine = useMatrixEngineWGPU();
    useEffect(() => {
        const handleAmmoReady = () => {
            // your logic when Ammo is ready
            downloadMeshes({
                cube: "./res/meshes/cube.obj",
            }, (m) => {
                engine.addMeshObj({
                    position: { x: position[0], y: position[1], z: position[2] },
                    rotation: { x: rotation[0], y: rotation[1], z: rotation[2] },
                    rotationSpeed: { x: 0, y: 0, z: 0 },
                    texturesPaths: ['/res/meshes/cube.png'],
                    name: name,
                    mesh: m.cube,
                    physics: physics
                });
                console.log('Test access for obj', engine.matrixAmmo.getBodyByName(name));
            });
        };
        window.addEventListener('AmmoReady', handleAmmoReady, { once: true });
        return () => {
            window.removeEventListener('AmmoReady', handleAmmoReady);
        };
    }, []);
    return null;
};
