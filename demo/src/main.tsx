import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatrixEngineProvider } from 'me-webgpu-react';
// import App from './App';
import Demo3 from './demo3/Demo3';
import Demo from './demo4/Demo4';
import './index.css';

const AppDeclaration=() => (
  <MatrixEngineProvider>
    <Demo />
  </MatrixEngineProvider>
);
ReactDOM.createRoot(document.getElementById('root')!).render(<AppDeclaration />);
// ReactDOM.render(<AppDeclaration />, document.getElementById('root'));