# me-webgpu-react

React wrapper for MatrixEngine WebGPU.

## Supported: 
 - Cube
 - Ball
 - Mesh

## Usage

```tsx
import React from "react";
import {MatrixEngineCanvas, Cube} from "me-webgpu-react";

function App() {
  const handleEngineReady = (engine: any) => {
    console.log("Main app object [engine] :", engine);
    // You can now call matrix-engien-wbpug top level code etc.
  };

  return (
    <MatrixEngineCanvas
      onReady={handleEngineReady}
      canvasSize={{w: 256, h: 256}}
      clearColor={"black"}>
      <Mesh
        position={[0, -2, -10]}
        rotation={[0, 0, 0]}
        rotationSpeed={[0, 0, 0]}
        // physics={{ enabled: false, geometry: "Cube", kinematic: true }}
        physics={{enabled: false}}
        texture={"/res/meshes/cube.png"}
        meshPath="/res/my-meshes/swat.obj"
        scale={[5, 5, 5]}
      />
    </MatrixEngineCanvas>
  );
}

export default App;
```

### About engine

 Engine name: `matrix-engine-webgpu`
 Source: [Github source](https://github.com/zlatnaspirala/matrix-engine-wgpu)

### Licence

MIT Licence
Created by Nikola Lukic zlatnaspirala@gmail.com
maximumroulette.com 2025
