import React from 'react';

export enum TypeOfGeometry {
  Cube = "Cube",
  Sphere = "Sphere"
}

type AnimationRange = {
  from: number;
  to: number;
  speed: number;
};

export type MeshProps = {
  name?: string;
  canvasId?: string;
  position?: [number, number, number];
  physics?: { enabled: boolean; geometry?: TypeOfGeometry };
  rotation?: [number, number, number];
  rotationSpeed?: [number, number, number];
  color?: string;
  texturePath?: string;
  scale?: [number, number, number];
  meshPath?: string;
  raycast?: boolean | { enabled: boolean; radius: number };
  objSeqArg?: {
    id: string;
    path: string;
    from: number;
    to: number;
  };
  objAnim?: {
    id: string;
    meshList: any;
    currentAni: number;
    animations: {
      active: string;
      [name: string]: string | AnimationRange;
    };
  };
};

/**
 * Pass-through configuration for MatrixEngineWGPU's constructor.
 * The index signature intentionally keeps every current and future engine option available.
 */
export type MatrixEngineWGPUOptions = {
  fastRender?: number;
  render?: 'zero' | 'nano' | 'no-shadows' | 'mobile1' | 'culling' | 'GPUInstancedDraw' | 'GPUIndirectDraw' | string;
  GPUCullingRad?: number;
  cullingRange?: number;
  fastRenderAlternative?: boolean;
  dontUsePhysics?: boolean;
  useJolt?: boolean;
  useAmmo?: boolean;
  useCannon?: boolean;
  useMatter?: boolean;
  alphaMode?: 'opaque' | 'premultiplied';
  MAX_SPOTLIGHTS?: number;
  MAX_BONES?: number;
  SHADOW_RES?: number;
  CAM_SPEED?: number;
  MOUSE_SENS?: number;
  TOUCH_SENS?: number;
  GRAVITY_Y_AXIS?: number;
  PHYSICS_GROUND_Y?: number;
  PHYSICS_GROUND_BYX?: number;
  PHYSICS_GROUND_BYZ?: number;
  LOAD_AFTER_CLICK_MOBILE?: boolean;
  useSingleRenderPass?: boolean;
  canvasSize?: 'fullscreen' | { w: number; h: number };
  mainCameraParams?: any;
  clearColor?: GPUColorDict | string;
  [option: string]: any;
};

export type MatrixEngineCanvasProps = {
  onReady?: (engine: any) => void;
  /** Complete MatrixEngineWGPU constructor options; engine-specific settings are passed through unchanged. */
  engineOptions?: MatrixEngineWGPUOptions;
  useSingleRenderPass?: boolean;
  /** Set false when the demo configures its own lighting. Defaults to true for backwards compatibility. */
  addDefaultLight?: boolean;
  canvasSize?: 'fullscreen' | { w: number; h: number };
  mainCameraParams?: any;
  clearColor?: GPUColorDict | string;
  canvasId?: string;
};

export type GPUColorDict = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export declare const Cube: React.FC<MeshProps>;
