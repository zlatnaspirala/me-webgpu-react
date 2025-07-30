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

    <>
      <h2>Use matrix-engine-webgpu in reactjs apps</h2>
      <h2>Add obj intro reactjs context</h2>
      <div style={{ display: "flex" }}>

        <MatrixEngineCanvas
          onReady={handleEngineReady}
          canvasSize={{ w: 256, h: 256 }}
          clearColor={{ r: 1, b: 0.12, g: 0, a: 1 }}>

          <Mesh
            position={[2, -2, -10]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 0, 0]}
            // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
            physics={{ enabled: false }}
            texture={'/res/meshes/cube.png'}
            meshPath="/res/my-meshes/swat.obj"
            scale={[5, 5, 5]} />

          <Mesh
            position={[-2, -2, -10]}
            rotation={[0, 0, 0]}
            rotationSpeed={[0, 100, 0]}
            // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
            physics={{ enabled: false }}
            texture={'/res/meshes/cube.png'}
            meshPath="/res/my-meshes/swat.obj"
            scale={[5, 5, 5]} />

        </MatrixEngineCanvas>
      </div>
    </>);
}

export default App;