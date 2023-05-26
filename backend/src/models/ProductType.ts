import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { IProductType } from '~/type';

const ProductTypeSchema = new Schema<IProductType>(
  {
    type_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  schemaOptions
);

export default model('product_types', ProductTypeSchema);
