import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { DiaryModel } from '~/type';

const DiarySchema = new Schema<DiaryModel>(
  {
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
  },
  schemaOptions
);

export default model('diaries', DiarySchema);
