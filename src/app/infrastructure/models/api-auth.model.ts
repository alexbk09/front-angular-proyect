export interface AuthUserDto {
  id: number;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  createdAt: string;
}

export interface AuthResponseDto {
  user: AuthUserDto;
  token: string;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'freelancer' | 'client';
}

export interface LogoutResponseDto {
  message: string;
}

export interface MeResponseDto {
  user: AuthUserDto;
}
