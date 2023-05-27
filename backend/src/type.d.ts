import { UserModel } from './type.d';
import { ObjectId } from 'mongoose';

export interface UserData {
  order_id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  banner?: string;
  address?: string;
  description?: string;
  website?: string;
  wallet: string;
}

export type UserModel = UserData & {
  password: string;
};

export interface ProductModel {
  order_id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  box_images: string[];
  certificated: string[];
  isProduction: boolean;
  expired_time: number;
  gtin_code: string;
  intro_video: string;
  selling_unit: ObjectId;
  expired_unit: ObjectId;
  product_type: ObjectId;
  producer: ObjectId;
  updatedBy: ObjectId;
}

export interface DiaryModel {
  action_name: string;
  descriptions: string;
  images: string[];
  tx_hash: string;
  product: ObjectId;
}

export interface UnitModel {
  type: string;
  value: string;
  createdBy: ObjectId;
}

export interface ProductTypeModel {
  name: string;
  createdBy: ObjectId;
}
