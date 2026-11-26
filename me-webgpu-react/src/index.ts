export { MatrixEngineProvider, useMatrixEngineWGPU, MatrixEngineWGPUContext, injectEngineExternally } from './MatrixEngineProvider';
export { MatrixEngineCanvas } from './MatrixEngineCanvas';
export { Cube } from './subComponents/cube';
export { Ball } from './subComponents/ball';
export { Mesh } from './subComponents/mesh';
export { ObjsSeqAnim } from './subComponents/objSeqAnim';

// Re-export the engine's complete public entry point. This keeps the React
// wrapper aligned with new cameras, effects, loaders, physics, networking,
// splat tools, navigation, and utility exports without maintaining a stale list.
// @ts-ignore matrix-engine-wgpu publishes its JavaScript entry point without declarations.
export * from 'matrix-engine-wgpu';
