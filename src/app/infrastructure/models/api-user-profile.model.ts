// Modelo alineado con la respuesta real de /api/profile.

export type UserRole = 'freelancer' | 'client';

export type UserThemePreference = 'light' | 'dark' | 'system';

export interface UserProfilePreferencesDto {
  theme?: UserThemePreference;
  language?: string | null;
}

export interface UserProfileUserDto {
  id: number;
  name: string;
  email: string;
  role: UserRole | string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfileProfileDto {
  type: UserRole;
  bio: string | null;
  avatarUrl: string | null;
  location: string | null;
  websiteUrl: string | null;
  preferences: UserProfilePreferencesDto | null;
}

export interface UserProfileDto {
  user: UserProfileUserDto;
  profile: UserProfileProfileDto | null;
}
