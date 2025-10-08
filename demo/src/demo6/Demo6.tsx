import React, { useEffect, useState } from 'react';
import { addRaycastsAABBListener, downloadMeshes, MatrixEngineCanvas, useMatrixEngineWGPU, makeObjSeqArg, ObjsSeqAnim, uploadGLBModel } from 'me-webgpu-react';

function getRandomInt(min: number, max: number) {
  if(max<=min) {
    throw new Error("Max must be greater than min");
  }

  const range=max-min+1;
  const maxValid=Math.floor(256/range)*range;

  let randomByte=new Uint8Array(1);

  while(true) {
    crypto.getRandomValues(randomByte); // Uses window.crypto (secure)
    if(randomByte[0]<maxValid) {
      return min+(randomByte[0]%range);
    }
  }
}

function Demo6() {
  const engine=useMatrixEngineWGPU();
  const [meshesData, setMeshesData]=useState(null);
  const [meshesData2, setMeshesData2]=useState(null);
  const getByName=(name: string) => engine.mainRenderBundle.find((obj: any) => obj.name===name);

  useEffect(() => {
    const handleAmmoReady=async () => {
      // your logic when Ammo is ready
      if(engine===null) { return; }
      (window as any).app=engine;
      // If you have multu engine instance in same page - arg is canvas id!
      addRaycastsAABBListener("Demo6");

      // woman
      var glbFile11=await fetch("res/my-meshes/glb/woman1.glb").then(res => res.arrayBuffer().then(buf => uploadGLBModel(buf, engine.device)));
      engine.addGlbObj({
        material: { type: 'normalmap', useTextureFromGlb: true },
        scale: [20, 20, 20],
        position: { x: 0, y: -4, z: -28 },
        name: 'woman1',
        texturesPaths: ['./res/images/logo.png'],
      }, null, glbFile11);

      setTimeout(() => {
        engine.cameras.WASD.yaw=-0.086;
        engine.cameras.WASD.pitch=-0.06;
        engine.cameras.WASD.position[1]=17;
        engine.lightContainer[0].position[1]=50;
      }, 2500)

    };

    window.addEventListener('AmmoReady', handleAmmoReady, { once: false });
    return () => {
      window.removeEventListener('AmmoReady', handleAmmoReady);
    };
  }, [engine]);

  useEffect(() => {
    const canvas=document.getElementById('Demo5');
    if(!canvas) return;
    const handler=(e: CustomEvent<{ hitObject: any }>) => {
      console.log('💥Canvas Ray Hit💥:', e.detail.hitObject);
      e.detail.hitObject.globalAmbient[0]=getRandomInt(0, 2);
      e.detail.hitObject.globalAmbient[1]=getRandomInt(0, 2);
      e.detail.hitObject.globalAmbient[2]=getRandomInt(0, 2);
    };
    canvas.addEventListener('ray.hit.event', handler as EventListener);
    return () => {
      canvas.removeEventListener('ray.hit.event', handler as EventListener);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h3 style={{ textAlign: "center" }}>Use matrix-engine-webgpu in reactjs apps</h3>
      <p style={{ textAlign: "center" }}>Demo name: Add dynamic/from-code AND from render tag Objs sequence animation (morph).</p>
      <div style={{ display: "flex", justifyContent: "center" }}>

        <MatrixEngineCanvas
          canvasId={"Demo6"}
          canvasSize={{ w: 512, h: 512 }}
          clearColor={{ r: 0, b: 0, g: 0, a: 1 }}
          mainCameraParams={{ type: 'WASD', responseCoef: 100 }}></MatrixEngineCanvas>
        <div style={{ display: "flex", flexDirection: "column" }}>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu source:<a href="https://github.com/zlatnaspirala/matrix-engine-wgpu">github repo</a></p>
      <p style={{ textAlign: "center" }}>matrix-engine-wgpu reactjs wrapper source:<a href="https://github.com/zlatnaspirala/me-webgpu-react">github repo</a></p>
      <p style={{ textAlign: "center" }}>npm i me-webgpu-react<a href="https://www.npmjs.com/package/me-webgpu-react">npm service</a></p>
      <div style={{ textAlign: "center" }}> <a href="https://maximumroulette.com"><img width="128px" src="res/images/logo.png" /></a></div>
    </div>);
}

export default Demo6;