import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { IProduct } from '~/type';

const ProductSchema = new Schema<IProduct>(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gtin_code: {
      type: String,
      unique: true,
    },
    intro_video: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
    selling_unit: {
      type: Schema.Types.ObjectId,
      ref: 'units',
      required: true,
    },
    expired_time: {
      type: Number,
    },
    expired_unit: {
      type: Schema.Types.ObjectId,
      ref: 'units',
      required: true,
    },
    product_type: {
      type: Schema.Types.ObjectId,
      ref: 'product_types',
    },
    producer: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  schemaOptions
);

export default model('products', ProductSchema);
