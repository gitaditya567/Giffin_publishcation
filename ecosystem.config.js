/**
 * PM2 Ecosystem Configuration for Griffin Publication
 * 
 * Usage on Live Server:
 *   npm install -g pm2
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup
 */

module.exports = {
  apps: [
    {
      name: 'griffin-backend',
      cwd: './backend',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 7000,
      },
    },
    {
      name: 'griffin-frontend',
      cwd: './frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 4000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],
};
