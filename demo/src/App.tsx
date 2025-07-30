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
    <MatrixEngineCanvas
      onReady={handleEngineReady}
      canvasSize={{ w: 256, h: 256 }}
      clearColor={'black'}>

      <Mesh
        position={[0, -2, -10]}
        rotation={[0, 0, 0]}
        rotationSpeed={[0, 0, 0]}
        // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
        physics={{ enabled: false }}
        texture={'/res/meshes/cube.png'}
        meshPath="/res/my-meshes/swat.obj"
        scale={[5, 5, 5]} />

    </MatrixEngineCanvas>);
}

export default App;