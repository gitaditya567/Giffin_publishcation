/**
 * Griffin Publication - Production Release Packager
 * Prepares a clean, production-ready bundle ready to upload to any live server.
 * Run via: npm run package
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_ZIP = path.join(ROOT_DIR, 'griffin-production-ready.zip');
const STAGING_DIR = path.join(ROOT_DIR, '_production_release');

console.log('====================================================');
console.log('  📦 Packaging Griffin Publication for Production');
console.log('====================================================');

// Step 1: Ensure frontend build exists
const nextDir = path.join(ROOT_DIR, 'frontend', '.next');
if (!fs.existsSync(nextDir)) {
  console.log('⚙️ Building frontend first...');
  execSync('npm run build', { cwd: path.join(ROOT_DIR, 'frontend'), stdio: 'inherit' });
}

// Clean previous staging and zip
if (fs.existsSync(STAGING_DIR)) {
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
}
if (fs.existsSync(OUTPUT_ZIP)) {
  fs.unlinkSync(OUTPUT_ZIP);
}
fs.mkdirSync(STAGING_DIR, { recursive: true });

function copyRecursiveSync(src, dest, ignoreList = []) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    const baseName = path.basename(src);
    if (ignoreList.includes(baseName)) return;

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        ignoreList
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📁 Copying production files...');

// 1. Root files
['package.json', 'start.js', 'ecosystem.config.js', 'README.md'].forEach((file) => {
  const src = path.join(ROOT_DIR, file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STAGING_DIR, file));
});

// 2. Backend files (ignore node_modules and uploads content)
console.log('📁 Copying backend...');
const backendDest = path.join(STAGING_DIR, 'backend');
fs.mkdirSync(backendDest, { recursive: true });
['server.js', 'package.json', 'package-lock.json', '.env.example'].forEach((file) => {
  const src = path.join(ROOT_DIR, 'backend', file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backendDest, file));
});
['routes', 'models', 'middleware'].forEach((dir) => {
  const src = path.join(ROOT_DIR, 'backend', dir);
  if (fs.existsSync(src)) copyRecursiveSync(src, path.join(backendDest, dir));
});
// Create empty uploads directory
fs.mkdirSync(path.join(backendDest, 'uploads'), { recursive: true });

// Copy backend .env if exists (or .env.example as fallback)
const backendEnv = path.join(ROOT_DIR, 'backend', '.env');
if (fs.existsSync(backendEnv)) {
  fs.copyFileSync(backendEnv, path.join(backendDest, '.env'));
} else {
  fs.copyFileSync(path.join(ROOT_DIR, 'backend', '.env.example'), path.join(backendDest, '.env'));
}

// 3. Frontend files
console.log('📁 Copying frontend (including pre-built .next, excluding cache)...');
const frontendDest = path.join(STAGING_DIR, 'frontend');
fs.mkdirSync(frontendDest, { recursive: true });

['package.json', 'package-lock.json', 'next.config.mjs', '.env.example'].forEach((file) => {
  const src = path.join(ROOT_DIR, 'frontend', file);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(frontendDest, file));
});

// Copy frontend public folder
const publicSrc = path.join(ROOT_DIR, 'frontend', 'public');
if (fs.existsSync(publicSrc)) {
  copyRecursiveSync(publicSrc, path.join(frontendDest, 'public'));
}

// Copy frontend .next EXCEPT cache
const nextDest = path.join(frontendDest, '.next');
fs.mkdirSync(nextDest, { recursive: true });
fs.readdirSync(nextDir).forEach((item) => {
  if (item === 'cache') return; // Skip heavy cache
  const srcItem = path.join(nextDir, item);
  const destItem = path.join(nextDest, item);
  copyRecursiveSync(srcItem, destItem);
});

// Create quick server start guide
const deployReadme = `# Griffin Publication - Live Server Quick Start

## On the Live Server:

### 1. Install Production Dependencies
\`\`\`bash
npm run install:all
\`\`\`

### 2. Verify Backend .env
Make sure backend/.env has your production MongoDB URI and PORT:
\`\`\`bash
nano backend/.env
\`\`\`

### 3. Start Application
Option A (Direct Node Runner):
\`\`\`bash
npm start
\`\`\`

Option B (PM2 - Recommended for 24/7 background):
\`\`\`bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
\`\`\`

Backend runs on port 5000.
Frontend runs on port 4000.
`;
fs.writeFileSync(path.join(STAGING_DIR, 'README-DEPLOY.md'), deployReadme);

// Create ZIP file using native tar or zip
console.log('🗜️  Compressing into griffin-production-ready.zip...');
try {
  try {
    execSync(`tar -a -c -f "${OUTPUT_ZIP}" *`, { cwd: STAGING_DIR, stdio: 'inherit' });
  } catch (tarErr) {
    if (process.platform === 'win32') {
      execSync(`powershell -Command "Compress-Archive -Path '${STAGING_DIR}\\*' -DestinationPath '${OUTPUT_ZIP}' -Force"`);
    } else {
      execSync(`zip -r "${OUTPUT_ZIP}" .`, { cwd: STAGING_DIR });
    }
  }
  // Clean up staging directory
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  console.log(`\n🎉 Success! Production bundle created at:\n   ${OUTPUT_ZIP}`);
} catch (err) {
  console.warn('⚠️  Could not compress to zip automatically. Staged files are available in:', STAGING_DIR);
}
