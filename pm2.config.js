module.exports = {
  apps : [{
    name: 'socialgamer-api',
    script: 'src/server.js',
    interpreter: 'node',
    instances: 1,
    autorestart: false,
    watch: ['src'],
    watch_delay: 1000,
    exec_mode: 'fork',
    wait_ready: true,
    listen_timeout: 3000,
    kill_timeout: 5000,
    restart_delay: 2000,
    max_restarts: 10
  }]
}
