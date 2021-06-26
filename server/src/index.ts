require('dotenv').config();
import * as http from 'http';
import config from './config/config';
import * as scheduler from 'node-schedule';

// Need to import all controllers so tsoa can build routes.ts
import * as Controllers from './controllers';

import Server from './config/express';

// Init the express application
const app = Server();
const server: http.Server = http.createServer(app);
server.listen(config.port);

server.on('error', (e: Error) => {
  console.error('Error starting server', e);
});

server.on('listening', () => {
  console.info(`Server started on port ${config.port}`);
});
