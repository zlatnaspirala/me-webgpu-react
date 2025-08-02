import React, { useState, useRef, useEffect } from 'react';
import { MatrixEngineWGPU } from 'matrix-engine-wgpu';
import { injectEngineExternally, MatrixEngineWGPUContext } from './MatrixEngineProvider';
export const MatrixEngineCanvas = ({ onReady, children, canvasId = "canvas1", canvasSize, clearColor, mainCameraParams = { type: 'WASD', responseCoef: 1000 } }) => {
    const containerRef = useRef(null);
    const [engine, setEngine] = useState(null);
    useEffect(() => {
        if (!engine && containerRef.current) {
            const app = new MatrixEngineWGPU({
                appendTo: containerRef.current,
                useSingleRenderPass: true,
                canvasSize: canvasSize,
                mainCameraParams: mainCameraParams,
                clearColor: clearColor,
                canvasId: canvasId
            }, () => {
                setEngine(app);
                injectEngineExternally(app);
                onReady?.(app);
            });
        }
    }, []);
    return (React.createElement("div", { ref: containerRef }, engine && (React.createElement(MatrixEngineWGPUContext.Provider, { value: engine }, children))));
};
