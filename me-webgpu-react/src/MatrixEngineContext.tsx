import { createContext, useContext } from 'react';

export const MatrixEngineWGPUContext = createContext<any>(null);

export const useMatrixEngineWGPU = () => useContext(MatrixEngineWGPUContext);
