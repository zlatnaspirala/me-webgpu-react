import React from 'react';

export declare enum TypeOfGeometry {
  Cube="Cube",
  Sphepe="Sphepe"
}

export type CubeProps={
  name: string;
  position: [number, number, number];
  physics: { enabled: boolean, geometry: TypeOfGeometry };
  rotation: [number, number, number];
  color?: string;
};
export declare const Cube: React.FC<CubeProps>;

export {};