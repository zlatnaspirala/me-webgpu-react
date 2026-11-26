import React, { useState } from 'react';
import './App.css';

const demos = [
  { title: 'Primitive scene', file: 'demo1.html', tag: 'SCENE BASICS', description: 'Start with a simple WebGPU scene and React integration.' },
  { title: 'Mesh rendering', file: 'demo2.html', tag: 'MESHES', description: 'Load and display engine mesh content.' },
  { title: 'Object animation', file: 'demo3.html', tag: 'ANIMATION', description: 'Explore animated objects and scene updates.' },
  { title: 'Physics', file: 'demo4.html', tag: 'PHYSICS', description: 'Connect scene objects with the physics system.' },
  { title: 'Raycasting', file: 'demo5.html', tag: 'INTERACTION', description: 'Build pointer interaction with 3D objects.' },
  { title: 'GLB workflow', file: 'demo6.html', tag: 'ASSETS', description: 'Explore the GLB model loading example.' }
];

const capabilities = [
  ['Complete engine API', 'Access the public MatrixEngineWGPU exports directly from the React package.'],
  ['React scene components', 'Use MatrixEngineCanvas and the existing Cube, Ball, Mesh and object-sequence components.'],
  ['Cameras and controls', 'Import the engine camera classes and configure the main camera through the canvas props.'],
  ['Effects and post-processing', 'Use engine-exported effects, volumetric clouds, water, particles and other effect systems.'],
  ['Loaders and animation', 'Use OBJ sequence helpers, GLB upload utilities and skeletal animation exports.'],
  ['Advanced systems', 'Reach physics, collision, splat tools, navigation, networking and utility exports.']
];

export default function App() {
  const [activeDemo, setActiveDemo] = useState(0);
  const demo = demos[activeDemo];

  return (
    <main className="showcase-shell">
      <header className="showcase-nav">
        <a className="brand" href="#top"><span className="brand-mark">ME</span><span>MatrixEngine <b>React</b></span></a>
        <nav>
          <a href="#features">Features</a>
          <a href="#showcase">Showcase</a>
          <a href="https://github.com/zlatnaspirala/matrix-engine-wgpu" target="_blank" rel="noreferrer">Engine source ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">REACT WRAPPER · MATRIXENGINE WGPU 2.x</p>
          <h1>Build immersive<br /><span>WebGPU worlds.</span></h1>
          <p className="hero-description">A React entry point to The Beast — a WebGPU engine for real-time 3D scenes, animation, physics and advanced rendering.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#showcase">Explore demos <span>↓</span></a>
            <a className="secondary-action" href="https://github.com/zlatnaspirala/me-webgpu-react" target="_blank" rel="noreferrer">View wrapper source ↗</a>
          </div>
          <div className="hero-stats"><span><strong>WebGPU</strong><small>GPU-native rendering</small></span><span><strong>React</strong><small>Composable workflow</small></span><span><strong>Engine API</strong><small>Full public exports</small></span></div>
        </div>
        <div className="hero-art" aria-label="Abstract WebGPU scene illustration">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="core-cube"><i /><i /><i /></div>
          <div className="art-label label-top">REAL-TIME 3D</div><div className="art-label label-bottom">MATRIX ENGINE · WGPU</div>
        </div>
      </section>

      <section className="section features-section" id="features">
        <div className="section-heading"><p className="eyebrow">ONE WRAPPER. THE FULL ENGINE.</p><h2>More than a few primitives.</h2><p>Keep the convenience of React components while reaching the complete public engine API.</p></div>
        <div className="feature-grid">
          {capabilities.map(([title, description], index) => <article className="feature-card" key={title}><span className="feature-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="section showcase-section" id="showcase">
        <div className="section-heading"><p className="eyebrow">LIVE EXAMPLES</p><h2>Explore the showcase.</h2><p>Select an example to preview the current React demo.</p></div>
        <div className="showcase-layout">
          <aside className="demo-list">
            {demos.map((item, index) => <button className={index === activeDemo ? 'demo-choice active' : 'demo-choice'} key={item.file} onClick={() => setActiveDemo(index)}><span className="demo-index">0{index + 1}</span><span className="demo-choice-copy"><small>{item.tag}</small><strong>{item.title}</strong></span><span className="demo-arrow">↗</span></button>)}
          </aside>
          <div className="demo-preview">
            <div className="preview-bar"><div className="window-dots"><i /><i /><i /></div><span>{demo.file}</span><a href={demo.file} target="_blank" rel="noreferrer">Open ↗</a></div>
            <iframe title={demo.title} src={demo.file} loading="lazy" />
            <div className="preview-caption"><div><small>{demo.tag}</small><h3>{demo.title}</h3><p>{demo.description}</p></div><a href={demo.file} target="_blank" rel="noreferrer">Open example ↗</a></div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <p className="eyebrow">READY TO BUILD?</p><h2>Your next 3D experience<br />starts here.</h2>
        <p>Install the wrapper, connect the engine source locally for development, and build with React.</p>
        <code>npm install me-webgpu-react</code>
        <a className="primary-action" href="https://github.com/zlatnaspirala/me-webgpu-react" target="_blank" rel="noreferrer">Get the wrapper ↗</a>
      </section>

      <footer className="showcase-footer"><span>MatrixEngine React · The Beast WebGPU</span><span>Built for the open Web.</span></footer>
    </main>
  );
}
