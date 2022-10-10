module.exports = {
  apps : [{
    name: 'nuviotivr',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      HTTP_PORT: 3000,
      HTTP_PASSWORD: '',
      HTTP_USERNAME: '',
    }
  }]
};
