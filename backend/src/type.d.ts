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

export interface IProduct {
  order_id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  box_images: string[];
  certificated: string[];
  status: boolean;
  expired_time: number;
  gtin_code: string;
  intro_video: string;
  selling_unit: ObjectId;
  expired_unit: ObjectId;
  product_type: ObjectId;
  producer: ObjectId;
}

export interface IUnit {
  type: string;
  value: string;
}

export interface IProductType {
  type_name: string;
}
