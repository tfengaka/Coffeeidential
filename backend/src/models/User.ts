import { Schema, model } from 'mongoose';

import { schemaOptions } from '~/models';
import { IUser } from '~/type';

const UserSchema = new Schema<IUser>(
  {
    displayID: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
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
