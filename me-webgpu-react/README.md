# me-webgpu-react

React wrapper for MatrixEngine WebGPU.
#### Logo: 
 <img width="320" height="320" src="https://github.com/zlatnaspirala/matrix-engine-wgpu/blob/main/public/res/icons/512.png?raw=true" />
> Logo includes the official WebGPU logo.
> **WebGPU logo by [W3C](https://www.w3.org/)**
> Licensed under [Creative Commons Attribution 4.0](https://www.w3.org/2023/02/webgpu-logos.html)

## Supported: 
You can draw any obj format file.
 - Cube
 - Ball
 - Mesh

Basic physics is supported. Based on ammojs.

## Usage

```tsx
import React from "react";
import {MatrixEngineCanvas, Cube} from "me-webgpu-react";

function App() {
  const handleEngineReady = (engine: any) => {
    console.log("Main app object [engine] :", engine);
    // You can now call matrix-engien-wbpug top level code etc.
    // For complex 3d apps you will need to write and organise code here...
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
