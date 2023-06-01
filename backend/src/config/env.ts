import * as dotenv from 'dotenv';
dotenv.config();

interface IEnv {
  APP_HOST: string;
  APP_PORT: number;
  JWT_SECRET_KEY: string;
  BLOCKCHAIN_RPC: string;
  MONGODB_URI: string;
  CONTRACT_ADDRESS?: string;
}

const env: IEnv = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: Number(process.env.APP_PORT) || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  BLOCKCHAIN_RPC: process.env.BLOCKCHAIN_RPC || '',
  MONGODB_URI: process.env.MONGODB_URI || '',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
};

export default env;
