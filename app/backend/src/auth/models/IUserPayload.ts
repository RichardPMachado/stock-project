export interface IUserPayload {
  sub: number;
  email: string;
  name: string;
  tipo: string;
  iat?: number;
  exp?: number;
}
