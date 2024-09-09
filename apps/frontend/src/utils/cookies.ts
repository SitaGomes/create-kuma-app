import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY =
  process.env.SECRET_KEY || 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

export const getCookie = (key: string) => {
  const hashedValue = Cookies.get(key);
  return hashedValue
    ? CryptoJS.AES.decrypt(hashedValue, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    : null;
};

export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes,
) => {
  const hashedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  Cookies.set(key, hashedValue, options);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
