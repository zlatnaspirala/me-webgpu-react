import React from 'react';

export declare enum TypeOfGeometry {
  Cube="Cube",
  Sphepe="Sphepe"
}

export type MeshProps={
  name: string;
  position: [number, number, number];
  physics: { enabled: boolean, geometry: TypeOfGeometry };
  rotation: [number, number, number];
  rotationSpeed: [number, number, number];
  color?: string;
  texturePath: string;
  scale: [];
  meshPath?: string;
};

export declare const Cube: React.FC<MeshProps>;

export type MatrixEngineCanvasProps={
  onReady?: (engine: any) => void;
  useSingleRenderPass?: boolean;
  canvasSize?: 'fullscreen'|{ w: number, h: number };
  mainCameraParams?: any;
  clearColor: GPUColorDict;
};


export type GPUColorDict = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export {};