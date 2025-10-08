import React, { useState } from 'react';

function App() {
  const pages=["demo1.html", "demo2.html", "demo3.html", "demo4.html", "demo5.html", "demo6.html"];
  const [currentIndex, setCurrentIndex]=useState(0);
  const goNext=() => {
    if(currentIndex<pages.length-1) {
      setCurrentIndex(currentIndex+1);
    }
  };
  const goPrevious=() => {
    if(currentIndex>0) {
      setCurrentIndex(currentIndex-1);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      {/* <h2 style={{ textAlign: "center" }}>
        Use matrix-engine-webgpu in reactjs apps</h2> */}
      <h3 style={{ textAlign: "center" }}> Welcome here </h3>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button onClick={goPrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          {pages[currentIndex]}
        </span>
        <button onClick={goNext} disabled={currentIndex === pages.length - 1}>
          Next
        </button>
      </div>

      <div style={{ justifyContent: "center", height: "100vh", overflowY: "auto" }}>
        <iframe width="100%" height="768px" src={pages[currentIndex]} />
      </div>
      <h4 style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></h4>
    </div>);
}

export default App;