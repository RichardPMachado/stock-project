import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export interface IAuthRequest extends Request {
  user: User;
}
