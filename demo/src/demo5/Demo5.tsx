import React, { useContext, useEffect, useState } from 'react';
import { downloadMeshes, addRaycastsAABBListener, rayIntersectsSphere, getRayFromMouse, addRaycastListener, MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU, makeObjSeqArg } from 'me-webgpu-react';

function Demo5() {
  const engine=useMatrixEngineWGPU();
  const [meshData, setMeshData]=useState(null);

  useEffect(() => {
    const handleAmmoReady=() => {
      // your logic when Ammo is ready
      downloadMeshes(makeObjSeqArg({
        id: "swat-walk-pistol",
        path: "res/my-meshes/objs-sequence/swat-walk-pistol",
        from: 1,
        to: 20
      }), (m: any) => {
        setMeshData(m["swat-walk-pistol"]);
        engine.addMeshObj({
          position: { x: 0, y: 0, z: -5 },
          rotation: { x: 0, y: 0, z: 0 },
          rotationSpeed: { x: 0, y: 0, z: 0 },
          texturesPaths: ['./res/meshes/cube.png'],
          name: "swat-walk-pistol",
          mesh: m["swat-walk-pistol"],
          physics: { enabled: false },
          objAnim: {
            id: "swat-walk-pistol",
            meshList: m,
            currentAni: 1,
            animations: {
              active: 'walk',
              walk: {
                from: 1,
                to: 20,
                speed: 3
              },
              // walkPistol: { JUST FOR EXAMPLE ...
              //   from: 36,
              //   to: 60,
              //   speed: 3
              // }
            }
          }
        })
      }, { scale: [1, 1, 1] });

      const getByName=(name: string) => engine.mainRenderBundle.find((obj: any) => obj.name===name);
      console.log(getByName("swat-walk-pistol") + "<<<<<<<<<<")
      getByName("swat-walk-pistol").objAnim.play('walk');
    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: true });
    return () => {
      window.removeEventListener('AmmoReady', handleAmmoReady);
    };
  }, [engine]);

  useEffect(() => {
    const canvas=document.getElementById('Demo4');
    if(!canvas) return;
    const handler=(e: CustomEvent<{ hitObject: any }>) => {
      console.log('💥Canvas Ray Hit💥:', e.detail.hitObject);
    };
    canvas.addEventListener('ray.hit.event', handler as EventListener);
    return () => {
      canvas.removeEventListener('ray.hit.event', handler as EventListener);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h2>
      <p style={{ textAlign: "center" }}>Demo name: Add cube dynamic - Raycast hit vs physics & nonphysics scene objects.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          canvasId={"Demo4"}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}></MatrixEngineCanvas>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <button onClick={() => {
            console.log('onClick useMatrixEngineWGPU from any component...');
            engine.matrixAmmo.getBodyByName('myBall1');
            var CUBE=engine.matrixAmmo.getBodyByName('myBall1');
            CUBE.setLinearVelocity(new engine.matrixAmmo.Ammo.btVector3(0, 10, -2));
            // matrixAmmo.getBodyByName(('CubePhysics' + x)).MEObject
          }}>Add force to the ball</button> */}
        </div>
      </div>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></p>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu reactjs wrapper source:<a href="https://github.com/zlatnaspirala/me-webgpu-react">github repo</a></p>
      <p style={{ textAlign: "center" }}>npm i me-webgpu-react<a href="https://www.npmjs.com/package/me-webgpu-react">npm service</a></p>
      <div style={{ textAlign: "center" }}> <a href="https://maximumroulette.com"><img width="128px" src="res/images/logo.png" /></a></div>
    </div>);
}

export default Demo5;