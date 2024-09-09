import { AuthUser } from '@kuma/models';
import { COOKIE } from '../constants';
import ENDPOINTS from '../constants/ENDPOINTS';
import { setCookie, setJwtCookie } from '../utils';
import BaseApi from './base.api';

class AuthApi extends BaseApi {
  static async register(name: string, email: string, password: string) {
    return this.post(ENDPOINTS.REGISTER, { name, email, password });
  }

  static async login(email: string, password: string) {
    const data = (await this.post(ENDPOINTS.LOGIN, { email, password })) as {
      token: string;
      user: AuthUser;
    };
    setJwtCookie(data.token);
    setCookie(COOKIE.USER, JSON.stringify(data.user));
    return data;
  }

  static async getUser() {
    return this.get(ENDPOINTS.GET_USERS) as Promise<AuthUser>;
  }
}

export default AuthApi;
