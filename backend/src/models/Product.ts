import { Schema, model } from 'mongoose';
import { schemaOptions } from '~/models';
import { ProductModel } from '~/type';

const ProductSchema = new Schema<ProductModel>(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    product_type: {
      type: Schema.Types.ObjectId,
      ref: 'product_types',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    box_images: {
      type: [String],
    },
    certificated: {
      type: [String],
    },
    description: {
      type: String,
    },
    intro_video: {
      type: String,
    },
    is_production: {
      type: Boolean,
      default: true,
    },
    expired_time: {
      type: Number,
    },
    gtin_code: {
      type: String,
    },
    selling_unit: {
      type: Schema.Types.ObjectId,
      ref: 'units',
    },
    expired_unit: {
      type: Schema.Types.ObjectId,
      ref: 'units',
    },
    producer: {
      type: String,
      ref: 'users',
      required: true,
    },
    hash_token: {
      type: String,
      unique: true,
    },
    tx_hash: {
      type: String,
      unique: true,
    },
  },
  schemaOptions
);

export default model('products', ProductSchema);
