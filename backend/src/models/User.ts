import { Schema, model } from 'mongoose';

import { schemaOptions } from '~/models';
import { UserModel } from '~/type';

const UserSchema = new Schema<UserModel>(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    wallet: {
      type: String,
      required: true,
      unique: true,
    },
  },
  schemaOptions
);
export default model('users', UserSchema);
