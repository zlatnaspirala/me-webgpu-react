import { useEffect } from 'react';
import { useMatrixEngineWGPU } from '../MatrixEngineProvider';
import { downloadMeshes } from 'matrix-engine-wgpu';
import { makeObjSeqArg } from '..';
export const ObjsSeqAnim = ({ name = ("myMesh-" + Date.now()), position = [0, 1, -5], physics = undefined, rotation = [0, 0, 0], rotationSpeed = [0, 0, 0], texturePath = 'res/meshes/cube.png', scale = [1, 1, 1], meshPath = "res/meshes/cube.obj", objSeqArg = null, objAnim = null }) => {
    const engine = useMatrixEngineWGPU();
    useEffect(() => {
        const handleAmmoReady = () => {
            if (objSeqArg === null || objSeqArg === undefined) {
                console.error('No init argument for objs sequence anim loader...');
                return;
            }
            downloadMeshes(makeObjSeqArg(objSeqArg), (m) => {
                engine.addMeshObj({
                    position: { x: position[0], y: position[1], z: position[2] },
                    rotation: { x: rotation[0], y: rotation[1], z: rotation[2] },
                    rotationSpeed: { x: rotationSpeed[0], y: rotationSpeed[1], z: rotationSpeed[2] },
                    texturesPaths: [texturePath],
                    name: name,
                    mesh: m[name],
                    physics: physics,
                    objAnim: objAnim
                });
                const getByName = (name) => engine.mainRenderBundle.find(obj => obj.name === name);
                getByName(name).objAnim.play('walk');
            }, { scale: [10, 10, 10] });
        };
        window.addEventListener('AmmoReady', handleAmmoReady, { once: true });
        return () => {
            window.removeEventListener('AmmoReady', handleAmmoReady);
        };
    }, []);
    return null;
};
