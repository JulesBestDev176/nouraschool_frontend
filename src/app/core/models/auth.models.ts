export type UserRole =
  | 'ADMIN'
  | 'CAISSIER'
  | 'SURVEILLANT'
  | 'ENSEIGNANT'
  | 'ELEVE'
  | 'PARENT'
  | 'RH'
  | 'SUPER_ADMIN';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string | null;
  tokenType?: string;
  expiresIn?: number;
  refreshExpiresIn?: number;
  passwordChangeRequired?: boolean;
}

export interface AuthMeDto {
  id: string;
  email: string;
  telephone?: string;
  role: UserRole;
  tenantId: string;
  tenantNom?: string;
  prenom: string;
  nom: string;
}

export interface ChangePasswordRequest {
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  nouveauMotDePasse: string;
}
