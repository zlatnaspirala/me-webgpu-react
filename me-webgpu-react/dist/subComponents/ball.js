import { useEffect } from 'react';
import { useMatrixEngineWGPU } from '../MatrixEngineProvider';
import { downloadMeshes } from 'matrix-engine-wgpu';
export const Ball = ({ name = "myBall1", position = [0, 1, -15], physics = undefined, rotation = [0, 0, 0], rotationSpeed = [0, 0, 0], color = 'white' }) => {
    const engine = useMatrixEngineWGPU();
    useEffect(() => {
        const handleAmmoReady = () => {
            // your logic when Ammo is ready
            downloadMeshes({
                ball: "/res/meshes/ball.obj",
            }, (m) => {
                engine.addMeshObj({
                    position: { x: position[0], y: position[1], z: position[2] },
                    rotation: { x: rotation[0], y: rotation[1], z: rotation[2] },
                    rotationSpeed: { x: rotationSpeed[0], y: rotationSpeed[1], z: rotationSpeed[2] },
                    texturesPaths: ['/res/meshes/cube.png'],
                    name: name,
                    mesh: m.ball,
                    physics: physics
                });
                console.log('Test access for sphere obj', engine.matrixAmmo.getBodyByName(name));
            });
        };
        window.addEventListener('AmmoReady', handleAmmoReady, { once: false });
        return () => {
            window.removeEventListener('AmmoReady', handleAmmoReady);
        };
    }, []);
    return null;
};
