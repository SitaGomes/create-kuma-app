import { COOKIE } from '../constants';
import { AuthUser } from '@kuma/models';
import { getCookie, removeCookie, setCookie } from './cookies';

function decodeJwtPayload(token: string) {
  const base64Url = token.split('.')[1];
  if (!base64Url) return;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

export const setJwtCookie = (session: string) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  setCookie(COOKIE.JWT, session, {
    expires: 1,
    path: '/',
    sameSite: 'None',
    secure: !isDevelopment,
  });
};

export const getJwtCookie = () => {
  const sessionCookie = getCookie(COOKIE.JWT);
  if (!sessionCookie) return null;
  return sessionCookie;
};

export const removeJwtCookie = () => {
  removeCookie(COOKIE.JWT);
};

export const isJwtTokenValid = () => {
  return getJwtCookie() !== null;
};

export const getAuthUser = (): AuthUser | undefined => {
  const session = getJwtCookie();
  if (session === null) return;
  return decodeJwtPayload(session);
};
