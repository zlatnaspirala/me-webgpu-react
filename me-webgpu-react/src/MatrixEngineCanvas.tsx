import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU, downloadMeshes } from 'matrix-engine-wgpu';
import { PropsWithChildren } from 'react';
import { MatrixEngineWGPUContext } from './MatrixEngineContext';
import { MatrixEngineCanvasProps } from "./types";

export type MatrixEngineCanvasPropsWithChildren=PropsWithChildren<MatrixEngineCanvasProps>;

export const MatrixEngineCanvas: React.FC<MatrixEngineCanvasPropsWithChildren>=({
  onReady,
  children,
  canvasSize,
  clearColor }) => {
  const containerRef=useRef<HTMLDivElement>(null);
  const [engine, setEngine]=useState<any>(null);

  useEffect(() => {
    if(!engine&&containerRef.current) {
      const app=new MatrixEngineWGPU({
        appendTo: containerRef.current,
        useSingleRenderPass: true,
        canvasSize: canvasSize,
        mainCameraParams: {
          type: 'WASD',
          responseCoef: 1000
        },
        clearColor: clearColor
      }, () => {
        setEngine(app);
        onReady?.(app);
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {engine&&(
        <MatrixEngineWGPUContext.Provider value={engine}>
          {children}
        </MatrixEngineWGPUContext.Provider>
      )}
    </div>
  );
};
