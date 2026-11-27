import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU, downloadMeshes } from 'matrix-engine-wgpu';
import { PropsWithChildren } from 'react';
import { MatrixEngineCanvasProps } from "./my-types";
import { injectEngineExternally, MatrixEngineWGPUContext, MatrixEngineProvider } from './MatrixEngineProvider';

export type MatrixEngineCanvasPropsWithChildren=PropsWithChildren<MatrixEngineCanvasProps>;

export const MatrixEngineCanvas: React.FC<MatrixEngineCanvasPropsWithChildren>=({
  onReady,
  children,
  canvasId="canvas1",
  canvasSize,
  clearColor,
  mainCameraParams,
  engineOptions={},
  useSingleRenderPass=engineOptions.useSingleRenderPass ?? true,
  addDefaultLight=true }) => {
  const containerRef=useRef<HTMLDivElement>(null);
  const [engine, setEngine]=useState<any>(null);

  useEffect(() => {
    if(!engine&&containerRef.current) {
      const app=new MatrixEngineWGPU({
        ...engineOptions,
        appendTo: containerRef.current,
        useSingleRenderPass,
        canvasSize: canvasSize ?? engineOptions.canvasSize,
        mainCameraParams: mainCameraParams ?? engineOptions.mainCameraParams ?? { type: 'WASD', responseCoef: 1000 },
        clearColor: clearColor ?? engineOptions.clearColor,
        canvasId
      }, () => {
        setEngine(app);
        injectEngineExternally(app);
        if(addDefaultLight) app.addLight();
        setTimeout(() => { onReady?.(app); }, 1000);
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
