// pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: "os-ui",
      script: "yarn",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
      // Critical for zero-downtime
      wait_ready: true,
      listen_timeout: 30000,
      kill_timeout: 5000,
      // Stability settings
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: "1G",
      autorestart: true,
      watch: false,
    }
  ]
};
