// Copy runtime assets and the engine's ambient declaration into the package output.
const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');
const declaration = path.join(__dirname, 'src', 'matrix-engine-wgpu.d.ts');

fs.copy(srcDir, destDir)
  .then(() => fs.copyFile(declaration, path.join(destDir, 'matrix-engine-wgpu.d.ts')))
  .then(() => {
    console.log('Copied public assets and MatrixEngine declarations to dist/');
  })
  .catch(err => {
    console.error('Failed to copy package assets:', err);
    process.exitCode = 1;
  });
