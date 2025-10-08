import React, { useContext, useEffect, useState } from 'react';
import { addRaycastsAABBListener, rayIntersectsSphere, getRayFromMouse, addRaycastListener, MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU } from 'me-webgpu-react';

function getRandomInt(min: number, max: number) {
  if(max<=min) {
    throw new Error("Max must be greater than min");
  }

  const range=max-min+1;
  const maxValid=Math.floor(256/range)*range;

  let randomByte=new Uint8Array(1);

  while(true) {
    crypto.getRandomValues(randomByte); // Uses window.crypto (secure)
    if(randomByte[0]<maxValid) {
      return min+(randomByte[0]%range);
    }
  }
}

function Demo3() {

  const engine=useMatrixEngineWGPU();

  const handleEngineReady=(argEngine: any) => {
    console.log('⚗️ MatrixEngineWebGpu: ', argEngine);
    // Just for dev.
    (window as any)['app']=argEngine;
    // MatrixEngine Workspace code here...
    addRaycastsAABBListener("Demo3");
    setTimeout(() => {
      argEngine.cameras.WASD.yaw=-0.086;
      argEngine.cameras.WASD.pitch=-0.06;
    }, 400)
  };

  useEffect(() => {
    const canvas=document.getElementById('Demo3');
    if(!canvas) return;
    const handler=(e: CustomEvent<{ hitObject: any }>) => {
      console.log('💥Canvas Ray Hit💥:', e.detail.hitObject);
      e.detail.hitObject.globalAmbient[0]=getRandomInt(0, 2);
      e.detail.hitObject.globalAmbient[1]=getRandomInt(0, 2);
      e.detail.hitObject.globalAmbient[2]=getRandomInt(0, 2);
    };
    canvas.addEventListener('ray.hit.event', handler as EventListener);
    return () => {
      canvas.removeEventListener('ray.hit.event', handler as EventListener);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h3 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h3>
      <p style={{ textAlign: "center" }}>Demo name: Add cube - Raycast hit vs physics objects.</p>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          canvasId={"Demo3"}
          onReady={handleEngineReady}
          canvasSize={{ w: 512, h: 512 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>

          <Cube
            name="MyPhysicsCube"
            position={[0, 0, -6]}
            rotation={[0, 0, 0]}
            scale={[2, 2, 2]}
            rotationSpeed={[0, 100, 0]}
            physics={{ enabled: true, geometry: "Cube" }} // kinematic: true
            texturePath={'./res/meshes/cube.png'}
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
      <div style={{ textAlign: "center" }}> <a href="https://maximumroulette.com"><img width="128px" src="res/images/logo.png" /></a></div>
    </div>);
}

export default Demo3;