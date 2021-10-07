module.exports = {
  apps: [{
    name: "scaffolding-api",
    script: "node /scaffolding/src/apps/index.js",
    env: {
      ENVIRONMENT: "development",
      QMS_API_PORT: 8080,
      QMS_API_JWT_SECRET: "ChrGhZC2GHQ3PyDJmcvMUPv7xSpwuma8IJqNeMHSwg0n5Ff1BmqXKMGXXN8milY",
      QMS_DB_URL: "sqlserver",
      QMS_DB_PORT: 1433,
      QMS_DB_USER: "sa",
      QMS_DB_PASSWORD: "yourStrong(!)Password",
      QMS_DB_DATABASE: "qms_dev",
      WSDL_FILE_NAME: 'Qms_Opera.xml',
      WS_USER_NAME: 'wsuser3',
      WS_PASSWORD: 'wer234@31',
      WS_DOMAIN: 'UBM',
      WS_USER_CACHE_TTL_HOURS: 4,
      FILE_SERVER_PORT: 8081,
      FILE_SERVER_UPLOAD_DIRECTORY: "./file-storage"
    },
    error_file: './pm2-logs/scaffolding-api-err.log',
    out_file: './pm2-logs/scaffolding-api-output.log'
  }]
}
