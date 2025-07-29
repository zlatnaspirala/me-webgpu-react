import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU } from 'matrix-engine-wgpu';
import { MatrixEngineWGPUContext } from './MatrixEngineContext';
export const MatrixEngineCanvas = ({ onReady, children }) => {
    // const canvasRef=useRef<HTMLCanvasElement|null>(null);
    const containerRef = useRef(null);
    const [engine, setEngine] = useState(null);
    useEffect(() => {
        if (!engine && containerRef.current) {
            const app = new MatrixEngineWGPU({
                appendTo: containerRef.current, // only for react wrapper
                useSingleRenderPass: true,
                // canvasSize: 'fullscreen',
                canvasSize: { w: '100', h: '100' },
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
    return (React.createElement("div", { ref: containerRef, style: { width: '100%', height: '100%' } }, engine && (React.createElement(MatrixEngineWGPUContext.Provider, { value: engine }, children))));
};
