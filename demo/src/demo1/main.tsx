import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatrixEngineProvider } from 'me-webgpu-react';
import Demo from './Demo1';
import '../index.css';

const AppDeclaration=() => (
  <MatrixEngineProvider>
    <Demo />
  </MatrixEngineProvider>
);
ReactDOM.createRoot(document.getElementById('root')!).render(<AppDeclaration />);