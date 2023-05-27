import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { ProductTypeModel } from '~/type';

const ProductTypeSchema = new Schema<ProductTypeModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  schemaOptions
);

export default model('product_types', ProductTypeSchema);
