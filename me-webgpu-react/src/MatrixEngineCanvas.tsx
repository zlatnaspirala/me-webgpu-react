import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU, downloadMeshes } from 'matrix-engine-wgpu';
import { PropsWithChildren } from 'react';
import { MatrixEngineWGPUContext } from './MatrixEngineContext';

type MatrixEngineCanvasProps={
  onReady?: (engine: any) => void;
  useSingleRenderPass?: boolean;
  canvasSize?: 'fullscreen'|'custom';
  mainCameraParams?: any;
};

export type MatrixEngineCanvasPropsWithChildren=PropsWithChildren<MatrixEngineCanvasProps>;

export const MatrixEngineCanvas: React.FC<MatrixEngineCanvasPropsWithChildren>=({ onReady, children }) => {
  const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const [engine, setEngine]=useState<any>(null);

  useEffect(() => {
    if(canvasRef.current&&!engine) {
      const app=new MatrixEngineWGPU({
        useSingleRenderPass: true,
        canvasSize: 'fullscreen',
        mainCameraParams: {
          type: 'WASD',
          responseCoef: 1000
        }
      }, () => {
        setEngine(app);
        onReady?.(app);
      });
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
      {engine&&(
        <MatrixEngineWGPUContext.Provider value={engine}>
          {children}
        </MatrixEngineWGPUContext.Provider>
      )}
    </>
  );
};
