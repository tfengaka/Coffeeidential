import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { DiaryModel } from '~/type';

const DiarySchema = new Schema<DiaryModel>(
  {
    action_id: {
      type: Schema.Types.ObjectId,
      ref: 'units',
      required: true,
    },
    action_name: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
    },
    images: {
      type: [String],
    },
    tx_hash: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    createdBy: {
      type: String,
      ref: 'users',
      required: true,
    },
  },
  schemaOptions
);

export default model('diaries', DiarySchema);
