module.exports = {
  apps: [
    {
      name: 'hive',
      script: 'npx',
      args: 'nx serve hive --prod --port=812',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
