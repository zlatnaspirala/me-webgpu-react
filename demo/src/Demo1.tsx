import React from 'react';
import { MatrixEngineCanvas, Mesh, Cube, Ball } from 'me-webgpu-react';

function Demo1() {
  const handleEngineReady=(engine: any) => {
    console.log('MatrixEngineWebGpu: ', engine);
    // Just for dev.
    (window as any)['app']=engine;
    // MatrixEngine Workspace code here...
  };

  return (

    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h2>
      <h2 style={{ textAlign: "center" }}>Demo name: Add cube</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>

          <Cube
            position={[0, 0, -6]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 100, 0]}
            // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
            physics={{ enabled: false }}
            texture={'/res/meshes/cube.png'}
            scale={[2, 2, 2]} />

        </MatrixEngineCanvas>
      </div>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></p>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu reactjs wrapper source:<a href="https://github.com/zlatnaspirala/me-webgpu-react">github repo</a></p>
      <p style={{ textAlign: "center" }}>npm i me-webgpu-react<a href="https://www.npmjs.com/package/me-webgpu-react">npm service</a></p>
    </div>);
}

export default Demo1;