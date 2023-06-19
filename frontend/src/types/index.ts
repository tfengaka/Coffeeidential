export interface ProductInfo {
  images: string[];
  box_images: string[];
  certificated: string[];
  price?: number;
  selling_unit?: string;
  gtin_code?: string;
  intro_video?: string;
  description?: string;
  expired_time?: number;
  expired_unit?: string;
}
export interface Product extends ProductInfo {
  _id: string;
  name: string;
  product_type: string;
  is_production: boolean;
  createdAt: string;
}
export interface Diary {
  _id: string;
  action_id: string;
  action_name: string;
  descriptions: string;
  images: string[];
  tx_hash: string;
  product: string;
  createdAt: string;
  createdBy: string;
}
export interface AuthUser {
  _id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  banner?: string;
  address?: string;
  website?: string;
  description?: string;
}
export interface Unit {
  _id: string;
  value: string;
}
export interface SignInForm {
  email: string;
  password: string;
}
export interface SignUpInput extends SignInForm {
  full_name: string;
}
export interface SignUpForm extends SignUpInput {
  repassword?: string;
}
export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}
export interface JWTDecoded {
  id: string;
  iat: number;
  exp: number;
}
export interface LookUpProducer {
  _id: string;
  full_name: string;
  email: string;
}
export interface LookUpProduct extends Product {
  producer: AuthUser;
}
export type LookUpDiary = Diary & {
  createdBy: LookUpProducer;
};
export interface LookUpData extends LookUpProduct {
  diaries: LookUpDiary[];
}
export interface ChartData {
  date: string;
  count: number;
}
export interface TopProduct {
  _id: string;
  name: string;
  images: string[];
  description?: string;
  product_type?: string;
  price?: number;
  count?: number;
  producer?: AuthUser;
}
export interface OverviewData {
  scan_count: ChartData[];
  top_products: TopProduct[];
}
