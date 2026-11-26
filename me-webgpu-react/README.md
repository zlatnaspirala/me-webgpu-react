# me-webgpu-react

React wrapper for **MatrixEngine WebGPU / The Beast**. Version 2.0.0 aligns the wrapper with the MatrixEngine 2.x public API and exposes the engine's complete top-level named export surface.

## What's new in 2.x

- Re-export the complete public API from `matrix-engine-wgpu` (engine classes, cameras, loaders, effects, physics/collision, navigation, networking, splat tools and utilities).
- Keep React helpers: `MatrixEngineCanvas`, `MatrixEngineProvider`, `useMatrixEngineWGPU`, `Cube`, `Ball`, `Mesh` and `ObjsSeqAnim`.
- Update the engine peer dependency to `^2.0.1`.
- Refresh the React showcase with feature cards and selectable live demos.
- Correct the geometry enum spelling to `Sphere` and improve optional prop typing.

The wrapper re-exports the engine entry point rather than maintaining a manually curated copy of its exports. Newly added named exports in the engine become available through this package after the engine dependency is updated.

## Install

```bash
npm install me-webgpu-react matrix-engine-wgpu
```

React 18 and 19 are supported by the peer dependency range.

## Local engine development

This repository expects the engine source checkout to be a sibling directory named `matrix-engine-wgpu` for local development. The wrapper package and demo use a local file dependency:

```text
../matrix-engine-wgpu
```

If your checkout uses another folder layout, update the `file:` paths in `me-webgpu-react/package.json` and `demo/package.json` to point to your local engine checkout. The published wrapper uses `matrix-engine-wgpu` as a peer dependency; the local file path is only for this repository's development/demo setup.

Build the wrapper:

```bash
cd me-webgpu-react
npm install
npm run build
```

Run the showcase:

```bash
cd demo
npm install
npm run dev
```

## Basic React setup

```tsx
import { MatrixEngineCanvas, Mesh, useMatrixEngineWGPU } from 'me-webgpu-react';

function SceneControls() {
  const engine = useMatrixEngineWGPU();
  // Access engine scene APIs after the canvas initializes.
  return null;
}

export default function App() {
  return (
    <MatrixEngineCanvas
      canvasSize="fullscreen"
      mainCameraParams={{ type: 'WASD', responseCoef: 1000 }}
      onReady={(engine) => console.log('MatrixEngine ready', engine)}
    >
      <SceneControls />
      <Mesh
        position={[0, 0, -8]}
        rotation={[0, 0, 0]}
        rotationSpeed={[0, 0.2, 0]}
        physics={{ enabled: false }}
        meshPath="/res/my-meshes/example.obj"
        scale={[1, 1, 1]}
      />
    </MatrixEngineCanvas>
  );
}
```

## Complete engine API

All named exports from the installed `matrix-engine-wgpu` package are re-exported from `me-webgpu-react`. For example, use engine exports directly:

```ts
import {
  MatrixEngineWGPU,
  FirstPersonCamera,
  RPGCamera,
  CloudsVolumetric,
  GaussianSplatLayer,
  uploadGLBModel,
  downloadMeshes,
  GeometryFactory,
  CollisionSystem
} from 'me-webgpu-react';
```

The list above is illustrative; the engine's current `index.js` is the authoritative list. Engine functions that require a running engine, GPU device, canvas, asset paths or event setup still need to be called according to the engine documentation.

## Showcase

The `demo/` folder contains a React/Vite presentation page and six example previews. It is intended as a starter showcase and API exploration page; the examples require a browser with WebGPU support.

## Links

- [MatrixEngineWGPU source](https://github.com/zlatnaspirala/matrix-engine-wgpu)
- [React wrapper source](https://github.com/zlatnaspirala/me-webgpu-react)
- [Engine API documentation](https://maximumroulette.com/apps/webgpu/api-docs/)

## License

MIT. See the repository license and engine/asset notices for their respective terms and attribution.
