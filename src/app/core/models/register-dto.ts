export interface RegisterDto {
  fullName: string,
  phoneNumber: string,
  email: string;
  password: string;
  confirmPassword: string,
  role?: string
}