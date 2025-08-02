import React from 'react';
import { MatrixEngineCanvas, Mesh, Cube, Ball } from 'me-webgpu-react';

function App() {
  const handleEngineReady=(engine: any) => {
    console.log('MatrixEngineWebGpu: ', engine);
    // Just for dev.
    (window as any)['app']=engine;
    // MatrixEngine Workspace code here...
  };

  return (

    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h2>
      <h2 style={{ textAlign: "center" }}>Demo name: Add mesh(obj)</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 1, b: 0.12, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}>
          <Mesh
            position={[2, -2, -10]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 0, 0]}
            // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
            physics={{ enabled: false }}
            texturePath={'./res/meshes/cube.png'}
            meshPath="res/my-meshes/swat.obj"
            scale={[5, 5, 5]} />

          <Cube
            position={[-2, -2, -10]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 100, 0]}
            // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
            physics={{ enabled: false }}
            texturePath={'./res/meshes/cube.png'}
            scale={[2, 2, 2]} />

        </MatrixEngineCanvas>
      </div>
      <h4 style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></h4>
    </div>);
}

export default App;