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

export {};