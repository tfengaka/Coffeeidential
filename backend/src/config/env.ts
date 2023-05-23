import * as dotenv from 'dotenv';
dotenv.config();

interface IEnv {
  APP_HOST: string;
  APP_PORT: number;
  JWT_SECRET_KEY: string;
  GETH_RPC_URL: string;
  MONGODB_URI: string;
}

const env: IEnv = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: Number(process.env.APP_PORT) || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  GETH_RPC_URL: process.env.GETH_RPC_URL || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
};

export default env;
