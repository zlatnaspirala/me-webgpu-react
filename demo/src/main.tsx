import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatrixEngineProvider } from 'me-webgpu-react';
// import App from './App';
// import Demo1 from './Demo1';
// import Demo2 from './Demo2';
// import Demo3 from './Demo3';
import Demo4 from './Demo4';
import './index.css';
const AppDeclaration = () => (
  <MatrixEngineProvider>
    <Demo4 />
  </MatrixEngineProvider>
);
ReactDOM.createRoot(document.getElementById('root')!).render(<AppDeclaration />);
// ReactDOM.render(<AppDeclaration />, document.getElementById('root'));