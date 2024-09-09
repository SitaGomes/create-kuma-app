import { User } from '../user/user';

export type AuthUser = Omit<User, 'password'>;
