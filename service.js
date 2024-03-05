const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'NextJsService', // Customize the service name
  description: 'hive', // Customize the service description
  script: 'dist/hive', // Provide the path to your server.js file
  nodeOptions: ['--harmony', '--max_old_space_size=4096'],
  env: [
    {
      name: 'PORT', // Customize environment variables if needed
      value: 812, // Set the port number
    },
    // Add more environment variables here if needed
  ],
});

// Listen for the "install" event and install the service
svc.on('install', function () {
  svc.start();
});

// Install the service
svc.install();
