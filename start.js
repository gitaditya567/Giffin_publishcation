/**
 * Griffin Publication - Production Application Runner
 * Starts both Backend API (Port 5000) and Next.js Frontend (Port 4000)
 * with a single command: node start.js (or npm start)
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const BACKEND_DIR = path.join(__dirname, 'backend');
const FRONTEND_DIR = path.join(__dirname, 'frontend');

const BACKEND_PORT = process.env.BACKEND_PORT || process.env.PORT || 7000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 4000;

console.log('====================================================');
console.log('  🚀 Starting Griffin Publication Production Server');
console.log('====================================================');

// Pre-flight check: Ensure frontend has been pre-built
const nextBuildDir = path.join(FRONTEND_DIR, '.next');
if (!fs.existsSync(nextBuildDir)) {
  console.warn('\n⚠️  WARNING: ".next" production build directory not found in frontend!');
  console.warn('   Running Next.js without a build will fail in production.');
  console.warn('   Please build locally using "npm run build" before starting.\n');
}

// Pre-flight check: backend uploads folder
const uploadsDir = path.join(BACKEND_DIR, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

let backendProcess = null;
let frontendProcess = null;
let isShuttingDown = false;

function logFormatted(prefix, colorCode, data) {
  const lines = data.toString().split('\n');
  for (const line of lines) {
    if (line.trim().length > 0) {
      console.log(`\x1b[${colorCode}m[${prefix}]\x1b[0m ${line}`);
    }
  }
}

// 1. Start Backend
console.log(`\n📦 Launching Backend API on port ${BACKEND_PORT}...`);
backendProcess = spawn('node', ['server.js'], {
  cwd: BACKEND_DIR,
  env: { ...process.env, PORT: BACKEND_PORT },
  shell: true,
});

backendProcess.stdout.on('data', (data) => logFormatted('BACKEND', '36', data)); // Cyan
backendProcess.stderr.on('data', (data) => logFormatted('BACKEND-ERR', '31', data)); // Red

backendProcess.on('error', (err) => {
  console.error('\x1b[31m[BACKEND-ERROR]\x1b[0m Failed to start backend:', err.message);
});

backendProcess.on('exit', (code, signal) => {
  if (!isShuttingDown) {
    console.log(`\x1b[31m[BACKEND]\x1b[0m Backend exited unexpectedly with code ${code || signal}`);
    shutdown();
  }
});

// 2. Start Frontend
console.log(`📦 Launching Frontend Production Server on port ${FRONTEND_PORT}...`);
// Use npm start or next start
const frontendCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
frontendProcess = spawn(frontendCmd, ['start'], {
  cwd: FRONTEND_DIR,
  env: { ...process.env, PORT: FRONTEND_PORT },
  shell: true,
});

frontendProcess.stdout.on('data', (data) => logFormatted('FRONTEND', '32', data)); // Green
frontendProcess.stderr.on('data', (data) => logFormatted('FRONTEND-ERR', '33', data)); // Yellow

frontendProcess.on('error', (err) => {
  console.error('\x1b[31m[FRONTEND-ERROR]\x1b[0m Failed to start frontend:', err.message);
});

frontendProcess.on('exit', (code, signal) => {
  if (!isShuttingDown) {
    console.log(`\x1b[31m[FRONTEND]\x1b[0m Frontend exited unexpectedly with code ${code || signal}`);
    shutdown();
  }
});

// Graceful Shutdown
function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log('\n🛑 Stopping all services...');

  const killProcess = (proc, name) => {
    if (proc && !proc.killed) {
      if (process.platform === 'win32' && proc.pid) {
        try {
          spawn('taskkill', ['/pid', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
        } catch (e) {}
      } else {
        try {
          proc.kill('SIGTERM');
        } catch (e) {}
      }
    }
  };

  killProcess(backendProcess, 'Backend');
  killProcess(frontendProcess, 'Frontend');

  setTimeout(() => {
    console.log('✅ All services stopped.');
    process.exit(0);
  }, 1000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);
