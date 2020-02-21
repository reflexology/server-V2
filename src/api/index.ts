import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import 'express-async-errors'; // handle all async errors and send them to error middleware.

import errorMiddleware from './middlewares/errorMiddleware';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import patientRouter from './routes/patientRouter';
import treatmentRouter from './routes/treatmentRouter';
import diagnosisRouter from './routes/diagnosisRouter';

function initMiddlewares(app: express.Application) {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Parse JSON
  app.use(express.json());

  // Request simple logger
  app.use(morgan('dev'));

  // Secure Express apps by setting various HTTP headers
  app.use(helmet());

  // Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
  app.use(compression());
}

function initRoutes(app: express.Application) {
  initMiddlewares(app);

  app.get('/api/status', (req, res) => {
    res.status(200).end();
  });

  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/patient', patientRouter);
  app.use('/api/treatment', treatmentRouter);
  app.use('/api/diagnosis', diagnosisRouter);
  app.use(errorMiddleware);
}

export default initRoutes;
