// copy-public.js
const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');

fs.copy(srcDir, destDir)
  .then(() => {
    console.log('✅ Copied public/ to dist/');
  })
  .catch(err => {
    console.error('❌ Failed to copy files:', err);
  });
