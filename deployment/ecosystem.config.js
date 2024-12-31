module.exports = {
  apps: [{
    name: 'os-ia',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'postgresql://os_ia:SECURE_PASSWORD@localhost:5432/os_ia_prod'
    },
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};