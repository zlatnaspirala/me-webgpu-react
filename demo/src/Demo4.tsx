import React, { useContext, useEffect, useState } from 'react';
import { downloadMeshes, addRaycastsAABBListener, rayIntersectsSphere, getRayFromMouse, addRaycastListener, MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU } from 'me-webgpu-react';

function Demo4() {

  const engine=useMatrixEngineWGPU();

  const handleEngineReady=(argEngine: any) => {
    console.log('⚗️ MatrixEngineWebGpu: ', argEngine);
    // Just for dev.
    (window as any)['app']=argEngine;
    // MatrixEngine Workspace code here...
    addRaycastsAABBListener();
  };

  useEffect(() => {
    const handleAmmoReady=() => {
      // your logic when Ammo is ready
      downloadMeshes({
        ball: "/res/meshes/ball.obj",
      }, (m: { ball: any; }) => {
        engine.addMeshObj({
          position: { x: 0, y: 0, z: 0 },
          rotation:{ x: 0, y: 0, z: 0 },
          rotationSpeed:{ x: 0, y: 0, z: 0 },
          texturesPaths: ['/res/meshes/cube.png'],
          name: "test",
          mesh: m.ball,
          physics: { enabled: true, geometry: "Cube" }
        })
      });
    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: true });
    return () => {
      window.removeEventListener('AmmoReady', handleAmmoReady);
    };
  }, [engine]);

  useEffect(() => {
    const canvas=document.getElementById('canvas1');
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
      <p style={{ textAlign: "center" }}>Demo name: Add cube - Raycast hit vs physics & nonphysics scene objects.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>

          {/* <Cube
            name="MyPhysicsCube"
            position={[0, 0, -6]}
            rotation={[0, 0, 0]}
            scale={[2, 2, 2]}
            rotationSpeed={[0, 100, 0]}
            physics={{ enabled: true, geometry: "Cube" }} // kinematic: true
            texture={'/res/meshes/cube.png'}
            raycast={{ enabled: true, radius: 1 }} /> */
          }

        </MatrixEngineCanvas>
        <button onClick={() => {
          console.log('onClick useMatrixEngineWGPU from any component...');
          engine.matrixAmmo.getBodyByName('MyPhysicsCube');
          var CUBE=engine.matrixAmmo.getBodyByName('MyPhysicsCube');
          CUBE.setLinearVelocity(new engine.matrixAmmo.Ammo.btVector3(0, 10, -2));
          // matrixAmmo.getBodyByName(('CubePhysics' + x)).MEObject
        }}>Add force to the cube</button>
      </div>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></p>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu reactjs wrapper source:<a href="https://github.com/zlatnaspirala/me-webgpu-react">github repo</a></p>
      <p style={{ textAlign: "center" }}>npm i me-webgpu-react<a href="https://www.npmjs.com/package/me-webgpu-react">npm service</a></p>
      <div style={{ textAlign: "center" }}> <a href="https://maximumroulette.com"><img width="128px" src="/res/images/logo.png" /></a></div>
    </div>);
}

export default Demo4;