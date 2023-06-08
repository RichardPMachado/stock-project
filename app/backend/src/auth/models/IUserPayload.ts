export interface IUserPayload {
  sub: number;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}
