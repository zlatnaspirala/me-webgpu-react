import React from 'react';
import { MatrixEngineCanvas, Mesh, Cube, Ball } from 'me-webgpu-react';

function App() {
  const handleEngineReady=(engine: any) => {
    console.log('HELLO :', engine);
    (window as any)['app']=engine;
    // You can now call engine.addBall(), engine.downloadMeshes(), etc.
  };

  return <MatrixEngineCanvas onReady={handleEngineReady} canvasSize={{ w: 256, h: 256 }} >

    <Mesh
      position={[0, -2, -10]}
      rotation={[0, 0, 0]}
      rotationSpeed={[0, 0, 0]}
      // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
      physics={{ enabled: false }}
      texture={'/res/meshes/cube.png'}
      meshPath="/res/my-meshes/swat.obj"
      scale={[5,5,5]}
      color="orange" />

  </MatrixEngineCanvas>;
}

export default App;