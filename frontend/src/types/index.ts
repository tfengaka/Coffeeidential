// Data Model Type
export interface Product {
  id: string;
  name: string;
  product_type: string;
  gtin_code: string;
  images: string[];
  certificated?: string[];
  box_images?: string[];
  isProduction: boolean;
  price: number;
  selling_unit: string;
  description: string;
  expire_time: number;
  expire_unit: string;
  intro_video: string;
  scan_count: number;
  create_at: string;
  create_by: string;
}

export interface Diary {
  id: string;
  action_name: string;
  description: string;
  images: string[];
  tx_hash: string;
  create_at: string;
  create_by: string;
}

// Authentication Type
export interface SignInForm {
  email: string;
  password: string;
}

export interface SignUpInput extends SignInForm {
  fullName: string;
}
export interface SignUpForm extends SignUpInput {
  repassword?: string;
}

export interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}

export interface JWTDecoded {
  id: string;
  key: string;
  iat: number;
  exp: number;
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
  description?: string;
}

// Constant Type
export interface Unit {
  _id: string;
  value: string;
}

// Common Component PropsType
export interface IContentPanelProps {
  isActive: boolean;
}
