module.exports = {
  apps : [{
    name: 'api',
    script: 'api/bin/www',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      PORT: 3001,
    }
  },
  {
    name: 'ivr',
    script: 'ivr/app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      HTTP_PORT: 3000,
    }
  }]
};
