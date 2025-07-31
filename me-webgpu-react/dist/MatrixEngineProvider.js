import React, { createContext, useContext, useState, useEffect } from 'react';
export const MatrixEngineWGPUContext = createContext(null);
let setGlobalEngine = null;
export const useMatrixEngineWGPU = () => useContext(MatrixEngineWGPUContext);
// This function allows external files to set engine (like handleEngineReady)
export const injectEngineExternally = (engine) => {
    if (setGlobalEngine) {
        setGlobalEngine(engine);
    }
    else {
        console.warn("MatrixEngineWGPUContext is not ready yet.");
    }
};
export const MatrixEngineProvider = ({ children }) => {
    const [engine, setEngine] = useState(null);
    // Store the setter for external access
    useEffect(() => {
        setGlobalEngine = setEngine;
        return () => {
            setGlobalEngine = null;
        };
    }, []);
    return (React.createElement(MatrixEngineWGPUContext.Provider, { value: engine }, children));
};
