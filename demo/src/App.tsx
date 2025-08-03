import React from 'react';

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>
        Use matrix-engine-webgpu in reactjs apps</h2>
      <h3 style={{ textAlign: "center" }}>Examples all at once - proof of concept</h3>
      <div style={{ justifyContent: "center", height: "100vh", overflowY: "auto" }}>
        <iframe width="100%" height="768px" src={"demo1.html"} />
        <iframe width="100%" height="768px" src={"demo2.html"} />
        <iframe width="100%" height="768px" src={"demo3.html"} />
        <iframe width="100%" height="768px" src={"demo4.html"} />
        <iframe width="100%" height="768px" src={"demo5.html"} />
      </div>
      <h4 style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></h4>
    </div>);
}

export default App;