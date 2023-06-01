import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import env from './config/env';
import { connectMongoDB } from './models';
import router from './routes';
import contract from './contract';
const initialServer = () => {
  const app = express();
  app.use(express.json({ limit: '25mb' }));
  app.use(cookieParser());
  app.use(cors());
  app.use('/api', router);
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`🚀 Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
  });
};

connectMongoDB()
  .then(() => console.log('🚀 MongoDB Connected...'))
  .then(() => console.log('🚀 Contract Started: ', contract.options.address))
  .then(() => initialServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
