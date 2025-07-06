import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU } from 'matrix-engine-wgpu';
import { MatrixEngineWGPUContext } from './MatrixEngineContext';
export const MatrixEngineCanvas = ({ onReady, children }) => {
    const canvasRef = useRef(null);
    const [engine, setEngine] = useState(null);
    useEffect(() => {
        if (canvasRef.current && !engine) {
            const app = new MatrixEngineWGPU({
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
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { ref: canvasRef, style: { width: '100vw', height: '100vh' } }),
        engine && (React.createElement(MatrixEngineWGPUContext.Provider, { value: engine }, children))));
};
