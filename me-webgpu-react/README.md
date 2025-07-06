# me-webgpu-react

React wrapper for MatrixEngine WebGPU.

## Usage

```tsx
import React from 'react';
import { MatrixEngineCanvas, Cube} from 'me-webgpu-react';

function App() {
  const handleEngineReady = (engine: any) => {
    console.log('Main app object [engine] :', engine);
    // You can now call matrix-engien-wbpug top level code etc.
  };

  return <MatrixEngineCanvas onReady={handleEngineReady} >
      <Cube position={[0, 3, -2]} color="orange" />
    </MatrixEngineCanvas>;
}

export default App;
```