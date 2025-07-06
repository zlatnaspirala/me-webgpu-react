import React from 'react';
import { PropsWithChildren } from 'react';
type MatrixEngineCanvasProps = {
    onReady?: (engine: any) => void;
    useSingleRenderPass?: boolean;
    canvasSize?: 'fullscreen' | 'custom';
    mainCameraParams?: any;
};
export type MatrixEngineCanvasPropsWithChildren = PropsWithChildren<MatrixEngineCanvasProps>;
export declare const MatrixEngineCanvas: React.FC<MatrixEngineCanvasPropsWithChildren>;
export {};
