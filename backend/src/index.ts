import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import env from './config/env';
import { connectMongoDB } from './models';
import router from './routes';

const initialServer = () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use('/api', router);
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
  });
};

connectMongoDB()
  .then(() => console.log('🚀 MongoDB Connected...'))
  .then(() => initialServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
