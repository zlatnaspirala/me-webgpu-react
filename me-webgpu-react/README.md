# 🚀 me-webgpu-react

React wrapper for **MatrixEngine WebGPU** — a lightweight WebGPU 3D engine for meshes, physics, and more.

[![NPM Version](https://img.shields.io/npm/v/me-webgpu-react.svg?style=flat-square)](https://www.npmjs.com/package/me-webgpu-react)
[![GitHub Stars](https://img.shields.io/github/stars/zlatnaspirala/matrix-engine-wgpu?style=social)](https://github.com/zlatnaspirala/matrix-engine-wgpu)

---

#### 🖼️ Logo  
<img width="320" height="320" src="https://github.com/zlatnaspirala/matrix-engine-wgpu/blob/main/public/res/icons/512.png?raw=true" />

> Logo includes the official WebGPU logo.  
> **WebGPU logo by [W3C](https://www.w3.org/)**  
> Licensed under [Creative Commons Attribution 4.0](https://www.w3.org/2023/02/webgpu-logos.html)

---

## ✅ Supported Features

🎯 **Mesh rendering** from `.obj` files  
🔷 Built-in primitives: `Cube`, `Ball`, and generic `Mesh`  
🧲 Basic **physics support** via [Ammo.js](https://github.com/kripken/ammo.js)  
🎯 **Raycasting** support — click to detect 3D object intersections  
🎮 Easy access to the raw engine object  
⚙️ Flexible control of transforms, rotation, scaling, and textures  

---

## 📦 Installation

```bash
npm install me-webgpu-react

```
or 

```bash
yarn add me-webgpu-react
```

⚡ Usage Example


```tsx
import React from "react";
import { MatrixEngineCanvas, Mesh } from "me-webgpu-react";

function App() {
  const handleEngineReady = (engine: any) => {
    console.log("Main app object [engine]:", engine);
    // Access the raw engine here
  };

  return (
    <MatrixEngineCanvas
      onReady={handleEngineReady}
      canvasSize={{ w: 256, h: 256 }}
      clearColor={"black"}
    >
      <Mesh
        position={[0, -2, -10]}
        rotation={[0, 0, 0]}
        rotationSpeed={[0, 0, 0]}
        physics={{ enabled: false }}
        texture={"/res/meshes/cube.png"}
        meshPath="/res/my-meshes/swat.obj"
        scale={[5, 5, 5]}
      />
    </MatrixEngineCanvas>
  );
}

export default App;
```

🧠 Access the engine from anywhere

```ts
const engine = useMatrixEngineWGPU();
```

Use this hook inside any component to access the engine instance, including raycast utilities and scene graph control.

🔍 Raycasting Support

You can cast rays from the camera into the 3D scene to detect intersections with objects.

✅ Ideal for building object interaction systems like:

Object click / selection

Highlighting

UI placement in 3D

Physics-based triggers


📚 Related Projects
🔧 Core engine: matrix-engine-wgpu

🧪 Physics: ammo.js


🌐 Live demo link:
https://maximumroulette.com/apps/webgpu/react/index.html


📄 License

MIT License
Created by Nikola Lukić
✉️ zlatnaspirala@gmail.com
🌐 maximumroulette.com
