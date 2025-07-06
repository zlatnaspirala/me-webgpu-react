import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { MatrixEngineWGPU } from 'matrix-engine-wgpu';

export const MatrixEngineCanvas: React.FC=() => {
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current) {
      const app=new MatrixEngineWGPU({
        useSingleRenderPass: true,
        canvasSize: 'fullscreen',
        mainCameraParams: {
          type: 'WASD',
          responseCoef: 1000
        }
      }, () => {
        console.log('Start the engine...')
      });
    }
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};