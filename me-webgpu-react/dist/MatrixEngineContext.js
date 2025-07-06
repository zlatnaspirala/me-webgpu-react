import { createContext, useContext } from 'react';
export const MatrixEngineWGPUContext = createContext(null);
export const useMatrixEngineWGPU = () => useContext(MatrixEngineWGPUContext);
