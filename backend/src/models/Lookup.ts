import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';

const LookupSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
  },
  schemaOptions
);

export default model('lookup', LookupSchema);
