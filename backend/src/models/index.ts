import mongoose from 'mongoose';
import env from '~/config/env';

mongoose.set('strictQuery', false);

export const connectMongoDB = async () =>
  await mongoose.connect(env.MONGODB_URI, {
    family: 4,
    autoIndex: false,
    connectTimeoutMS: 5000,
  });

export const schemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toOject: {
    virtuals: true,
  },
  timestamps: true,
};

export { default as ProductType } from './ProductType';
export { default as Unit } from './Unit';
export { default as User } from './User';
export { default as Product } from './Product';
