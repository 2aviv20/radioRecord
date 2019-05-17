module.exports = {
    apps : [{
      name: 'radio recorder',
      script: './build/app.js',
      args: '',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
  };
  