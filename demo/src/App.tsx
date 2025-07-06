import React from 'react';
import { MatrixEngineCanvas, Cube} from 'me-webgpu-react';

function App() {
  const handleEngineReady = (engine: any) => {
    console.log('HELLO :', engine);
    // You can now call engine.addBall(), engine.downloadMeshes(), etc.

  };

  return <MatrixEngineCanvas onReady={handleEngineReady} >
      <Cube position={[0, 1, 0]} color="orange" />
    </MatrixEngineCanvas>;
}

export default App;