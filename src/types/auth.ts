/**
 * 인증 관련 타입 정의
 */

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthError {
  field?: keyof LoginFormData | keyof RegisterFormData;
  message: string;
}
