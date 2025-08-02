import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU, downloadMeshes } from 'matrix-engine-wgpu';
import { PropsWithChildren } from 'react';
import { MatrixEngineCanvasProps } from "./types";
import { injectEngineExternally, MatrixEngineWGPUContext, MatrixEngineProvider } from './MatrixEngineProvider';

export type MatrixEngineCanvasPropsWithChildren=PropsWithChildren<MatrixEngineCanvasProps>;

export const MatrixEngineCanvas: React.FC<MatrixEngineCanvasPropsWithChildren>=({
  onReady,
  children,
  canvasId = "canvas1",
  canvasSize,
  clearColor,
  mainCameraParams={ type: 'WASD', responseCoef: 1000 } }) => {
  const containerRef=useRef<HTMLDivElement>(null);
  const [engine, setEngine]=useState<any>(null);

  useEffect(() => {
    if(!engine&&containerRef.current) {
      const app=new MatrixEngineWGPU({
        appendTo: containerRef.current,
        useSingleRenderPass: true,
        canvasSize: canvasSize,
        mainCameraParams: mainCameraParams,
        clearColor: clearColor,
        canvasId:canvasId
      }, () => {
        setEngine(app);
        injectEngineExternally(app);
        onReady?.(app);
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      {engine&&(
        <MatrixEngineWGPUContext.Provider value={engine}>
          {children}
        </MatrixEngineWGPUContext.Provider>
      )}
    </div>
  );
};
