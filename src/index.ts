import express from 'express';
import logger from './utils/logger';
import './config/env'; // must import .env before using the process.env
import routes from './api';
import connectToDb from './config/db';

const app = express();

routes(app);

connectToDb();

const port = process.env.PORT || 4000;

// Start Express server.
const server = app.listen(port, () =>
  logger.info(
    `###########################################################
      🛡️  Server listening on port: ${port} in ${process.env.NODE_ENV} mode 🛡️ 
      ###########################################################`
  )
);

export default server;
