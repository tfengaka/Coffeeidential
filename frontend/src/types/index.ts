// Data Model Type
export interface Product {
  id: string;
  order_id: string;
  name: string;
  product_type: string;
  gtin_code: string;
  images: string[];
  certificated?: string[];
  box_images?: string[];
  is_production: boolean;
  price: number;
  selling_unit: string;
  description: string;
  expire_time: number;
  expiry_unit: string;
  intro_video: string;
  createdAt: string;
}

export interface Diary {
  id: string;
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
  order_id: string;
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

// Form Type
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

export interface LookUpProductData extends Product {
  producer: AuthUser;
  diaries: Diary[];
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export interface JWTDecoded {
  id: string;
  key: string;
  iat: number;
  exp: number;
}
