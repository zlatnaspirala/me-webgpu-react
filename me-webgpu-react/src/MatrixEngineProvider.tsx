import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export const MatrixEngineWGPUContext = createContext<any>(null);
let setGlobalEngine: ((engine: any) => void) | null = null;

export const useMatrixEngineWGPU = () => useContext(MatrixEngineWGPUContext);

// This function allows external files to set engine (like handleEngineReady)
export const injectEngineExternally = (engine: any) => {
  if (setGlobalEngine) {
    setGlobalEngine(engine);
  } else {
    console.warn("MatrixEngineWGPUContext is not ready yet.");
  }
};

export const MatrixEngineProvider = ({ children }: { children: React.ReactNode }) => {
  const [engine, setEngine] = useState<any>(null);

  // Store the setter for external access
  useEffect(() => {
    setGlobalEngine = setEngine;
    return () => {
      setGlobalEngine = null;
    };
  }, []);

  return (
    <MatrixEngineWGPUContext.Provider value={engine}>
      {children}
    </MatrixEngineWGPUContext.Provider>
  );
};
