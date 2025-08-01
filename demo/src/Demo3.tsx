import React, { useContext, useEffect, useState } from 'react';
import { addRaycastsAABBListener, rayIntersectsSphere, getRayFromMouse, addRaycastListener, MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU } from 'me-webgpu-react';

function Demo3() {

  const engine=useMatrixEngineWGPU();

  const handleEngineReady=(argEngine: any) => {
    console.log('⚗️ MatrixEngineWebGpu: ', argEngine);
    // setEngine(engine);
    // Just for dev.
    (window as any)['app']=argEngine;
    // MatrixEngine Workspace code here...
    // addRaycastListener, getRayFromMouse, rayIntersectsSphere
    // addRaycastsAABBListener();
    addRaycastsAABBListener();
    window.addEventListener('ray.hit.event', (e: Event) => {
      const customEvent=e as CustomEvent;
      console.log('Ray hit:', customEvent?.detail.hitObject);
    });

    // window.addEventListener('click', (event) => {
    //   const canvas=document.querySelector('canvas');
    //   const camera=argEngine.cameras.WASD;

    //   const { rayOrigin, rayDirection }=getRayFromMouse(event, canvas, camera);

    //   for(const object of argEngine.mainRenderBundle) {
    //     if(rayIntersectsSphere(rayOrigin, rayDirection, object.position, object.raycast.radius)) {
    //       console.log('Object clicked:', object.name);
    //     }
    //   }
    // });
  };

  useEffect(() => {
    const canvas=document.getElementById('canvas1');
    if(!canvas) return;

    const handler=(e: CustomEvent<{ hitObject: any }>) => {
      console.log('Canvas Ray Hit:', e.detail.hitObject);
    };

    canvas.addEventListener('ray.hit.event', handler as EventListener);

    return () => {
      canvas.removeEventListener('ray.hit.event', handler as EventListener);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h2>
      <h2 style={{ textAlign: "center" }}>Demo name: Add cube - Raycast hit vs physics & nonphysics scene objects.</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>

          <Cube
            name="MyPhysicsCube"
            position={[0, 0, -6]}
            rotation={[0, 0, 0]}
            scale={[2, 2, 2]}
            rotationSpeed={[0, 100, 0]}
            physics={{ enabled: true, geometry: "Cube" }} // kinematic: true
            texture={'/res/meshes/cube.png'}
            raycast={{ enabled: true, radius: 1 }}
          />

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
    </div>);
}

export default Demo3;