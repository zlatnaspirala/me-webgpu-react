import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { MatrixEngineWGPU } from 'matrix-engine-wgpu';

export const MatrixEngineCanvas: React.FC=() => {
  const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(canvasRef.current) {
      const engine=new MatrixEngineWGPU({
        useSingleRenderPass: true,
        canvasSize: 'fullscreen',
        mainCameraParams: {
          type: 'WASD',
          responseCoef: 1000
        }
      });
      engine.start();
    }
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};