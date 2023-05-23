import mongoose from 'mongoose';
import Web3 from 'web3';
import env from '~/config/env';

mongoose.set('strictQuery', false);

export const connectMongoDB = async () =>
  await mongoose.connect(env.MONGODB_URI, {
    family: 4,
    autoIndex: false,
    connectTimeoutMS: 5000,
  });

export const web3 = new Web3(new Web3.providers.HttpProvider(env.GETH_RPC_URL));

export const schemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toOject: {
    virtuals: true,
  },
  timestamps: true,
};

export { default as User } from './User';
