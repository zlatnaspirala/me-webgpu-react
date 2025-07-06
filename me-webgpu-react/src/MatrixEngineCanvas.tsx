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
  // const canvasRef=useRef<HTMLCanvasElement|null>(null);
  const containerRef=useRef<HTMLDivElement>(null);
  const [engine, setEngine]=useState<any>(null);

  useEffect(() => {
    if(!engine&&containerRef.current) {
      const app=new MatrixEngineWGPU({
        appendTo: containerRef.current, // only for react wrapper
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
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {engine&&(
        <MatrixEngineWGPUContext.Provider value={engine}>
          {children}
        </MatrixEngineWGPUContext.Provider>
      )}
    </div>
  );
};
