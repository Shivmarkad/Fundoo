import dotenv from 'dotenv';
dotenv.config();
import database from './config/database';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import redis from './config/redis';
import routes from './routes';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';
import morgan from 'morgan';
// import cluster from 'cluster';
// import os from 'os';
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDoc));
database();
redis();
app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

// if (cluster.isPrimary) {
//   const numCPUs = os.cpus().length;
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
  
// }
app.listen(port, () => {
  logger.info(`Worker ${process.pid} listening on port ${port}`);
});
export default app;
