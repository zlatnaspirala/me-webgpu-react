import React from 'react';
import { MatrixEngineCanvas, Cube, Ball } from 'me-webgpu-react';

function App() {
  const handleEngineReady=(engine: any) => {
    console.log('HELLO :', engine);

    (window as any)['app']=engine;
    // You can now call engine.addBall(), engine.downloadMeshes(), etc.

  };

  return <MatrixEngineCanvas onReady={handleEngineReady} >

    {/* <Ball
      position={[2, 1, -15]}
      rotation={[0, 0, 0]}
      color="orange" /> */}

    <Cube
      position={[0, 3, -15]}
      rotation={[0, 0, 90]}
      rotationSpeed={[10, 10, 0]}
      // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
      color="orange" />



  </MatrixEngineCanvas>;
}

export default App;