import React, { useContext, useState } from 'react';
import { MatrixEngineCanvas, Mesh, Cube, Ball, useMatrixEngineWGPU } from 'me-webgpu-react';

function Demo2() {
  const engine=useMatrixEngineWGPU();
  const handleEngineReady=(argEngine: any) => {
    console.log('MatrixEngineWebGpu: ', argEngine);
    // MatrixEngine Workspace code here...
    setTimeout(() => {
      argEngine.cameras.WASD.yaw=-0.086;
      argEngine.cameras.WASD.pitch=-0.06;
    }, 400)
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h3 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h3>
      <h4 style={{ textAlign: "center" }}>Demo name: Add cube - Use physics & control via context.</h4>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 512, h: 512 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>
          <Cube
            name="MyPhysicsCube"
            position={[0, 0, -6]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 100, 0]}
            physics={{ enabled: true, geometry: "Cube" }} // kinematic: true
            texturePath={'./res/meshes/cube.png'}
            scale={[2, 2, 2]} />
        </MatrixEngineCanvas>
        <button onClick={() => {
          console.log('useMatrixEngineWGPU =>');
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

export default Demo2;