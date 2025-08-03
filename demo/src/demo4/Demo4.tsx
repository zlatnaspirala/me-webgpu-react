import React, { useContext, useEffect, useState } from 'react';
import { downloadMeshes, addRaycastsAABBListener, rayIntersectsSphere, getRayFromMouse, addRaycastListener, MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU } from 'me-webgpu-react';

function Demo4() {
  const engine=useMatrixEngineWGPU();
  const [meshData, setMeshData]=useState(null);

  const addNewCube=() => {
    // console.log("meshData" , meshData);
    engine.addMeshObj({
      position: { x: 0, y: 0, z: -5 },
      rotation: { x: 0, y: 0, z: 0 },
      rotationSpeed: { x: 0, y: 0, z: 0 },
      texturesPaths: ['./res/meshes/cube.png'],
      name: "test",
      mesh: meshData,
      physics: { enabled: true, geometry: "Sphere" }
    })
  }

  useEffect(() => {
    const handleAmmoReady=() => {
      // your logic when Ammo is ready
      downloadMeshes({
        ball: "res/meshes/ball.obj",
      }, (m: { ball: any; }) => {
        setMeshData(m.ball);
        engine.addMeshObj({
          position: { x: 0, y: 0, z: -5 },
          rotation: { x: 0, y: 0, z: 0 },
          rotationSpeed: { x: 0, y: 0, z: 0 },
          texturesPaths: ['./res/meshes/cube.png'],
          name: "myBall1",
          mesh: m.ball,
          physics: { enabled: true, geometry: "Sphere" }
        })
      }, { scale: [1, 1, 1] });
    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: false });
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
          <button onClick={() => {
            console.log('onClick useMatrixEngineWGPU from any component...');
            engine.matrixAmmo.getBodyByName('myBall1');
            var CUBE=engine.matrixAmmo.getBodyByName('myBall1');
            CUBE.setLinearVelocity(new engine.matrixAmmo.Ammo.btVector3(0, 10, -2));
            // matrixAmmo.getBodyByName(('CubePhysics' + x)).MEObject
          }}>Add force to the ball</button>
          <button onClick={addNewCube}>Add new ball with physics</button>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></p>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu reactjs wrapper source:<a href="https://github.com/zlatnaspirala/me-webgpu-react">github repo</a></p>
      <p style={{ textAlign: "center" }}>npm i me-webgpu-react<a href="https://www.npmjs.com/package/me-webgpu-react">npm service</a></p>
      <div style={{ textAlign: "center" }}> <a href="https://maximumroulette.com"><img width="128px" src="res/images/logo.png" /></a></div>
    </div>);
}

export default Demo4;