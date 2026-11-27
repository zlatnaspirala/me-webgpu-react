# me-webgpu-react

**React integration for MatrixEngine WebGPU (The Beast).** This package combines a small set of React scene helpers with the full named-export API of `matrix-engine-wgpu`.

> **Version 2.x** — this wrapper targets MatrixEngine 2.x. The engine's `index.js` is the source of truth for available engine exports; use the version installed in your project when checking signatures and behavior.

- [Engine repository](https://github.com/zlatnaspirala/matrix-engine-wgpu)
- [React wrapper repository](https://github.com/zlatnaspirala/me-webgpu-react)
- [Engine API documentation](https://maximumroulette.com/apps/webgpu/api-docs/)

## Contents

- [Features](#features)
- [Installation](#installation)
- [Local engine development](#local-engine-development)
- [Quick start](#quick-start)
- [React API](#react-api)
- [Complete engine API reference](#complete-engine-api-reference)
- [Engine lifecycle and usage notes](#engine-lifecycle-and-usage-notes)
- [Showcase](#showcase)
- [Build and publish](#build-and-publish)
- [Browser requirements](#browser-requirements)
- [License](#license)

## Features

- React context and hook for accessing the active engine instance.
- Canvas host component that initializes MatrixEngineWGPU.
- Convenience components for Cube, Ball, Mesh and OBJ-sequence animation.
- Re-export of the complete engine public named-export surface.
- React/Vite presentation page with example previews.

The wrapper does **not** replace the engine's own scene, GPU, physics or asset lifecycle. It makes the engine available in React and provides a few convenient components.

## Installation

Install the wrapper and its engine peer dependency:

```bash
npm install me-webgpu-react matrix-engine-wgpu
```

React 18 or React 19 is supported by the declared peer dependency range. Install a compatible React version in your application.

## Local engine development

For development in this repository, the package and demo are configured to use a local sibling engine checkout:

```text
../matrix-engine-wgpu
```

Expected layout:

```text
workspace/
  matrix-engine-wgpu/
  me-webgpu-react/
    me-webgpu-react/
    demo/
```

If your folders differ, edit the `file:` dependency in `me-webgpu-react/package.json` and `demo/package.json` to point to your engine checkout. The local path is for development; the published wrapper declares `matrix-engine-wgpu` as a peer dependency.

## Quick start

Wrap the application in `MatrixEngineProvider` and mount `MatrixEngineCanvas`. The canvas initializes the engine and publishes the instance to the context.

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  MatrixEngineProvider,
  MatrixEngineCanvas,
  Mesh,
  useMatrixEngineWGPU
} from 'me-webgpu-react';

function SceneControls() {
  const engine = useMatrixEngineWGPU();

  // The context is null before the canvas has initialized.
  if (!engine) return null;

  // Call engine APIs here, after initialization.
  return null;
}

function App() {
  return (
    <MatrixEngineProvider>
      <MatrixEngineCanvas
        canvasId="canvas1"
        canvasSize="fullscreen"
        mainCameraParams={{ type: 'WASD', responseCoef: 1000 }}
        onReady={(engine) => {
          console.log('MatrixEngine ready', engine);
        }}
      >
        <SceneControls />
        <Mesh
          name="exampleMesh"
          position={[0, 1, -8]}
          rotation={[0, 0, 0]}
          rotationSpeed={[0, 0.2, 0]}
          scale={[1, 1, 1]}
          meshPath="/res/meshes/example.obj"
          texturePath="/res/meshes/example.png"
          physics={{ enabled: false }}
        />
      </MatrixEngineCanvas>
    </MatrixEngineProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
```

Use `onReady` for initialization that needs the engine instance. Keep GPU resources, scene objects and engine-specific update logic inside the engine lifecycle rather than creating them during React render.

## React API

### `MatrixEngineProvider`

Provides the engine instance through `MatrixEngineWGPUContext`. Use one provider around the React application or scene area that needs access to the engine.

### `useMatrixEngineWGPU()`

React hook that returns the current engine instance from context. The value is initially `null`; check it before calling engine methods.

```tsx
const engine = useMatrixEngineWGPU();
if (!engine) return null;
```

### `MatrixEngineWGPUContext`

The exported React context used by the provider and canvas. Most applications should use the hook instead of consuming the context directly.

### `injectEngineExternally(engine)`

Updates the provider's engine state through the external setter when the provider is mounted. If the provider is not ready, the function logs a warning. This is an integration helper; prefer `MatrixEngineCanvas` and `onReady` for normal setup.

### `MatrixEngineCanvas`

Initializes a `MatrixEngineWGPU` instance in a container and provides it to descendants.

| Prop | Type | Description |
|---|---|---|
| `canvasId` | `string` | Canvas DOM id; default `"canvas1"`. |
| `canvasSize` | `"fullscreen" \| { w: number; h: number }` | Canvas sizing configuration passed to the engine. |
| `mainCameraParams` | `any` | Camera configuration passed to the engine; default is `{ type: 'WASD', responseCoef: 1000 }`. |
| `clearColor` | `GPUColorDict \| string` | Clear color passed to the engine. |
| `engineOptions` | `MatrixEngineWGPUOptions` | Passes every engine constructor option through unchanged, including rendering/culling modes and performance flags. |
| `useSingleRenderPass` | `boolean` | Controls the engine single-render-pass option; defaults to `true`. |
| `addDefaultLight` | `boolean` | Adds the wrapper's default light after initialization; defaults to `true`. Set false for demo-owned lighting. |
| `onReady` | `(engine) => void` | Called with the initialized engine instance. |
| `children` | `ReactNode` | React controls/components rendered once the engine is available. |

`MatrixEngineCanvas` defaults to `useSingleRenderPass: true` and calls `app.addLight()` during ready handling. Both behaviors are configurable with `useSingleRenderPass` and `addDefaultLight`; use `engineOptions` for the rest of the engine's constructor API. The engine is created once on component mount; changing constructor options after mount does not recreate the WebGPU engine.

### Pass the complete engine constructor configuration

The wrapper must not restrict MatrixEngineWGPU to a small React-specific prop list. Use
`engineOptions` to pass **any top-level constructor option** supported by your installed engine.
The wrapper forwards this object without renaming or filtering engine settings.

```tsx
<MatrixEngineCanvas
  canvasSize="fullscreen"
  engineOptions={{
    fastRender: 0.8,
    render: 'GPUInstancedDraw',
    GPUCullingRad: 20,
    dontUsePhysics: true,
    MAX_SPOTLIGHTS: 1,
    MAX_BONES: 0,
    mainCameraParams: {
      type: 'firstPersonCamera',
      responseCoef: 1000
    }
  }}
  onReady={(app) => {
    // Continue with the demo's own scene setup.
  }}
/>
```

The existing dedicated props (`canvasSize`, `mainCameraParams`, `clearColor`, `canvasId`)
override the corresponding values in `engineOptions` when supplied. The wrapper keeps
`useSingleRenderPass` enabled by default for backwards compatibility; set
`useSingleRenderPass={false}` or pass `engineOptions={{ useSingleRenderPass: false }}`
when your engine setup needs the other path. Set `addDefaultLight={false}` when the demo
creates and configures its own lights.

#### Rendering profiles found in the engine demos

These are distinct engine paths, not interchangeable React settings:

```tsx
// CPU culling profile (range is engine-version dependent).
<MatrixEngineCanvas engineOptions={{
  fastRender: 0.8,
  render: 'culling',
  cullingRange: 1200,
  dontUsePhysics: true
}} />

// GPU indirect/instanced culling profile used by the current engine source.
<MatrixEngineCanvas engineOptions={{
  fastRender: 0.8,
  render: 'GPUInstancedDraw',
  GPUCullingRad: 20,
  dontUsePhysics: true,
  MAX_SPOTLIGHTS: 1,
  MAX_BONES: 0
}} />
```

The engine source currently dispatches its GPU indirect renderer through
`render: 'GPUInstancedDraw'` (the implementation is `GPUIndirectDraws`). Some demos or
engine revisions may expose a different render option name such as `GPUIndirectDraw`;
the wrapper passes the string through exactly as provided and does not translate it.
Use the option recognized by the MatrixEngineWGPU version you have installed.

The current upstream `src/world.js` dispatches these render override values:

| `render` value | Engine path |
|---|---|
| `'zero'` | `zeroPass` override |
| `'nano'` | `nanoPass` override |
| `'no-shadows'` | `noShadowPass` override |
| `'mobile1'` | mobile-oriented render override |
| `'culling'` | CPU `CulledRenderPass`; tune with `cullingRange` |
| `'GPUInstancedDraw'` | GPU indirect renderer; tune with `GPUCullingRad` |

Physics is also selected at the constructor level in engine demos: `useJolt`,
`useAmmo`, `useCannon`, or `useMatter`. Use `dontUsePhysics: true` when a scene does
not need a physics bridge. Other recurring top-level options include `MAX_SPOTLIGHTS`,
`MAX_BONES`, `SHADOW_RES`, `CAM_SPEED`, `MOUSE_SENS`, `TOUCH_SENS`,
`GRAVITY_Y_AXIS`, and physics ground dimensions. These are passed through by
`engineOptions` without requiring wrapper releases for new engine options.

`fastRender` is a resolution/performance scaling option, not a render-mode selector.
The upstream demos use different values (for example `0.8`, `0.9`, and `0.95`) depending
on the scene and performance target. Other constructor settings seen across demos include
`dontUsePhysics`, `MAX_SPOTLIGHTS`, `MAX_BONES`, camera type/response, `GPUCullingRad`,
and `cullingRange`. Keep these scene-specific; the wrapper does not impose one profile.

#### Upstream demo coverage

The engine gallery contains 50 wired demo IDs plus additional source experiments. The examples
cover OBJ/GLB loading, procedural geometry, standard and instanced rendering, CPU/GPU culling,
physics backends (Ammo.js, Jolt, cannon-es, Matter.js), raycasting, camera/video textures,
skeletal and OBJ-sequence animation, Gaussian splats, water, particles, volumetric and bloom
effects, navigation, audio-reactive rendering, hand/face/pose tracking, streaming, and game
prototypes. #### What the current React demo pages cover

The wrapper's six current demo pages are introductory React examples, not a one-to-one port
of the engine gallery:

| React page | Current example approach |
|---|---|
| `demo1` | React canvas + primitive cube |
| `demo2` | Cube with Ammo physics and engine access through context |
| `demo3` | Physics object + raycast listener + React event cleanup |
| `demo4` | Runtime mesh creation and physics event handling |
| `demo5` | OBJ-sequence loading/animation, including imperative scene insertion |
| `demo6` | GLB upload and engine-side GLB object creation |

The advanced upstream demos still need their own React examples when you want to showcase
their complete workflows: maze culling, maximum instancing, navmesh/path-following,
volumetric/bloom setup, camera/video textures, procedural meshes, Gaussian splats,
water, skeletal animation, particles, reactive audio, tracking/NUI, and stream rendering.
Those demos differ in more than constructor flags: they also use async asset loading,
per-canvas raycast event names, physics-ready events, engine update hooks, and custom
scene setup. Keep those individual workflows intact when porting them; don't turn them
into one generic component.

The detailed, demo-by-demo index is maintained in the engine repository:
[Examples Guide](https://github.com/zlatnaspirala/matrix-engine-wgpu/blob/main/about-examples.md).

### Scene components

These components add engine objects imperatively and return no DOM element.

#### `Cube`

Creates a cube mesh using the wrapper's default cube OBJ and texture.

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | `"myCube1"` |
| `position` | `[number, number, number]` | `[0, 1, -5]` |
| `rotation` | `[number, number, number]` | `[0, 0, 0]` |
| `rotationSpeed` | `[number, number, number]` | `[0, 0, 0]` |
| `texturePath` | `string` | `"/res/meshes/cube.png"` |
| `scale` | `[number, number, number]` | `[1, 1, 1]` |
| `physics` | `{ enabled: boolean; geometry?: TypeOfGeometry }` | `undefined` |
| `raycast` | `boolean | { enabled: boolean; radius: number }` | `undefined` |

#### `Ball`

Creates a ball OBJ object with the wrapper's default ball mesh and texture. Supports `name`, `position`, `rotation`, `rotationSpeed`, `physics` and `color` props. Defaults: name `"myBall1"`, position `[0, 1, -15]`, zero rotation/speed, color `"white"`.

#### `Mesh`

Loads a mesh from an OBJ path. Supports `name`, `position`, `rotation`, `rotationSpeed`, `texturePath`, `scale`, `meshPath`, `physics` and `color`.

Defaults: name `"myMesh1"`, position `[0, 1, -5]`, `meshPath="./res/meshes/cube.obj"`, texture path `"res/meshes/cube.png"`, scale `[1, 1, 1]`, zero rotation/speed, color `"white"`.

#### `ObjsSeqAnim`

Loads an OBJ sequence and attaches an animation configuration. Requires `objSeqArg` and `objAnim`; when either is missing, it logs an initialization error. It uses the engine's `makeObjSeqArg` helper and starts the `walk` animation after loading.

Relevant props: `name`, `position`, `rotation`, `rotationSpeed`, `texturePath`, `scale`, `physics`, `raycast`, `objSeqArg`, `objAnim`.

### Types

`MeshProps` is exported from the scene component modules. `TypeOfGeometry` currently includes `Cube` and `Sphere`. `MatrixEngineCanvasProps` and `GPUColorDict` describe the canvas configuration and RGBA clear color.

## Complete engine API reference

The wrapper re-exports all named exports from `matrix-engine-wgpu`:

```ts
export * from 'matrix-engine-wgpu';
```

This means engine APIs can be imported directly from `me-webgpu-react`. The following list documents the current public entry point and groups the exports by purpose. It is a descriptive index, not a replacement for each API's exact constructor/method signature. Check the engine source and API docs for required arguments, GPU-device ownership and lifecycle details.

### Engine, configuration and geometry

| Export | Description |
|---|---|
| `MatrixEngineWGPU` | Main engine class; creates and manages the WebGPU scene/runtime. |
| `MEConfig` | Engine configuration module/object. |
| `GeometryFactory` | Geometry construction factory. |
| `geometryTypes` | Available geometry type definitions. |
| `geoTypesForMorph` | Geometry types used by mesh morphing. |
| `MeshMorpher` | Procedural mesh morphing utility. |
| `GenGeoTexture2` | Procedural geometry texture generation. |
| `PVector` | Engine vector/math class. |

### Cameras and camera controls

| Export | Description |
|---|---|
| `FirstPersonCamera` | First-person camera controller. |
| `PlaneCamera` | Camera controller for plane/2D-like scene navigation. |
| `RPGCamera` | RPG/player-follow camera. |
| `WASDCamera` | WASD-style camera controller. |
| `CinematicCamera` | Camera for cinematic movement and sequencing. |
| `CameraPath` | Camera path data/helper. |
| `DragRotateController` | Drag-based object/camera rotation controller. |
| `MobileDOM` | Mobile DOM/input helper. |
| `FullScreenManagerElement` | Fullscreen management element/helper. |
| `getOrientation` | Device orientation helper. |
| `isMobile` | Mobile-device detection helper. |
| `touchCoordinate` | Touch coordinate helper. |
| `ORBIT` | Orbit/control constant or helper. |

### Rendering, effects and post-processing

| Export | Description |
|---|---|
| `KaleidoscopeEffect` | Kaleidoscope post-processing effect. |
| `KaleidoscopePresets` | Preset configurations for the kaleidoscope effect. |
| `KaleidoscopeEmitter` | Kaleidoscope effect instance/emitter. |
| `CloudsVolumetric` | Volumetric cloud post-processing effect. |
| `CloudsVolumetric2` | Alternate volumetric cloud implementation. |
| `WaterSimEffect` | Water simulation effect. |
| `WaterSimSphereEffect` | Spherical water simulation effect. |
| `FlameEffect` | Flame visual effect. |
| `FlameEmitter` | Flame emitter/controller. |
| `ParticleActionEmitter` | Particle action emitter. |
| `PointerEffect` | Pointer-driven visual effect. |
| `ChartsEffect` | Chart/datagram visualization effect. |
| `EarthquakeEffect` | Seismic/earthquake visualization effect. |
| `BloodBurst` | Burst particle effect. |
| `LaserProjectile` | Laser projectile effect. |
| `DepthWebcamVoxelEffect` | Webcam depth/voxel effect. |
| `SplatFaceEffect` | Gaussian-splat face effect. |
| `AudioSplatFieldEffect` | Audio-reactive splat field effect. |
| `HPBarEffect` | Health bar effect. |
| `MANABarEffect` | Mana bar effect. |

### Gaussian splats and sprites

| Export | Description |
|---|---|
| `GaussianSplatLayer` | Gaussian splat layer for scene rendering. |
| `GaussianSplatScene` | Gaussian splat scene container. |
| `SplatColorAnimator` | Splat color animation utility. |
| `SplatPositionAnimator` | Splat position animation utility. |
| `SpriteInstance` | Sprite instance data/object. |
| `SpritesPack2D` | 2D sprite pack/container. |
| `initializeSpritesForMesh` | Initializes sprites associated with a mesh. |

### Physics, collision, players and projectiles

| Export | Description |
|---|---|
| `CollisionSystem` | Collision subsystem. |
| `ProjectileSystem` | Projectile behavior/system. |
| `InstancedKinematicOperations` | Kinematic operations for instanced objects. |
| `Player` | Engine player object/plugin. |
| `animateRotationY` | Scene-object Y-axis rotation animation helper. |
| `SWITCHER` | Engine switcher utility/constant. |
| `OSCILLATOR` | Oscillator utility/constant. |

### Navigation and maps

| Export | Description |
|---|---|
| `MapCreator` | Built-in map creation helper. |
| `loadNavMesh` | Loads navigation mesh data. |
| `followPath` | Navigation path-following helper. |

### Networking, external data and speech

| Export | Description |
|---|---|
| `MatrixStream` | Engine networking/stream class. |
| `NativeWebRTC` | Native WebRTC networking integration. |
| `ExternalDataHandler` | External data integration handler. |
| `CoinGeckoAdapter` | CoinGecko data adapter. |
| `SeismicPortalAdapter` | Seismic Portal data adapter. |
| `MatrixTTS` | Text-to-speech helper. |
| `mocapCsCmuEdu` | CMU motion-capture data export. |

### Loading, raycasting and spatial queries

| Export | Description |
|---|---|
| `downloadMeshes` | Loads OBJ mesh assets using the engine loader. |
| `makeObjSeqArg` | Creates loader arguments for OBJ sequence animation. |
| `uploadGLBModel` | GLB/glTF model upload/loading helper. |
| `BVHSkeletal` | BVH skeletal animation loader/representation. |
| `addRaycastsListener` | Registers the engine raycast listener. |
| `addRaycastsAABBListener` | Registers raycast listener using AABB intersection. |
| `getRayFromMouse` | Creates a ray from mouse coordinates. |
| `getRayFromMouse2` | Alternate mouse-to-ray helper. |
| `rayIntersectsSphere` | Ray/sphere intersection test. |
| `rayIntersectsSphere2` | Alternate ray/sphere intersection test. |
| `rayIntersectsAABB` | Ray/AABB intersection test. |
| `computeAABB` | Computes an axis-aligned bounding box. |
| `computeWorldVertsAndAABB` | Computes world vertices and bounds. |

### General utilities

| Export | Description |
|---|---|
| `byId` | DOM element lookup helper. |
| `vecOf` | Vector creation/conversion helper. |
| `randomIntFromTo` | Random integer in a range. |
| `randomFloatFromTo` | Random float in a range. |
| `getOrientation` | Device orientation helper. |
| `isMobile` | Mobile detection helper. |
| `FullScreenManagerElement` | Fullscreen helper. |
| `mb` | Engine utility export. |

> Some names above are engine-specific utility values or data exports rather than standalone classes. Their exact usage is defined by the engine source. The list is kept aligned with the current top-level `index.js`; the wrapper does not invent additional engine methods.

## Engine lifecycle and usage notes

1. **Wait for initialization.** `useMatrixEngineWGPU()` returns `null` before an engine is available. Use `onReady` for setup that requires the engine.
2. **WebGPU is asynchronous.** GPU adapter/device availability depends on the browser, OS, driver and hardware.
3. **Assets must be served.** OBJ, texture, GLB, BVH and other files must resolve from the URLs/paths expected by your engine configuration. Ensure your bundler or public directory serves them.
4. **Physics setup is engine-specific.** Some wrapper components listen for the engine's `AmmoReady` event before adding objects. Configure the physics backend and assets as required by the engine version.
5. **React unmount is not engine disposal.** The current canvas wrapper does not expose a dedicated dispose prop. If your application mounts/unmounts scenes repeatedly, manage engine/resource teardown explicitly or initialize the engine directly.
6. **Avoid creating scene objects during render.** Use `onReady`, effects or engine callbacks so React re-renders do not duplicate imperative engine objects.
7. **Check signatures in the engine.** This README gives purpose-level descriptions. Constructor arguments, object schemas and GPU resource ownership can vary between engine releases.

## Showcase

The `demo/` directory contains a Vite React presentation page with feature highlights and selectable example previews. Start it with:

```bash
cd demo
npm install
npm run dev
```

The showcase is a development/demo site, not part of the published library entry point.

## Build and publish

Build the wrapper:

```bash
cd me-webgpu-react
npm install
npm run build
```

The build emits JavaScript and declaration files to `dist/` and copies public runtime assets. Confirm that the installed engine dependency resolves correctly before publishing.

## Browser requirements

Use a browser with WebGPU support enabled and a compatible GPU/driver. WebGPU support and performance vary by browser, operating system and hardware. Provide a fallback or clear unsupported-browser message in production applications if WebGPU is unavailable.

## License

MIT. See the repository license and the engine repository for their respective licenses, asset notices and attribution requirements.
