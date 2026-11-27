/// <reference path="./matrix-engine-wgpu.d.ts" />
export { MatrixEngineProvider, useMatrixEngineWGPU, MatrixEngineWGPUContext, injectEngineExternally } from './MatrixEngineProvider';
export { MatrixEngineCanvas } from './MatrixEngineCanvas';
export { Cube } from './subComponents/cube';
export { Ball } from './subComponents/ball';
export { Mesh } from './subComponents/mesh';
export { ObjsSeqAnim } from './subComponents/objSeqAnim';
export { TypeOfGeometry } from './my-types';
export type { MatrixEngineCanvasProps, MatrixEngineWGPUOptions, GPUColorDict, MeshProps } from './my-types';

// Re-export the engine's complete public entry point instead of maintaining a stale list.
export * from 'matrix-engine-wgpu';
