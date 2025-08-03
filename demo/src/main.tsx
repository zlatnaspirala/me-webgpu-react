import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatrixEngineProvider } from 'me-webgpu-react';
import App from './App';
import './index.css';

const AppDeclaration=() => (
  <MatrixEngineProvider>
    <App />
  </MatrixEngineProvider>
);
ReactDOM.createRoot(document.getElementById('root')!).render(<AppDeclaration />);