import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import env from './config/env';
import { connectMongoDB } from './models';
import router from './routes';

const initialServer = () => {
  const app = express();
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(express.json({ limit: '50mb' }));
  app.use(cookieParser());
  app.use(morgan('[:method] - [:date[web]] - [:remote-addr] - :url - [:status] - :response-time ms'));

  app.use('/api', router);
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`🚀 Server running at http://${env.APP_HOST}:${env.APP_PORT}`);
  });
};

connectMongoDB()
  .then(() => console.log('🚀 DataBase Connected...'))
  .then(() => initialServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
