import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;

export const getCookie = (key: string) => {
  const hashedValue = Cookies.get(key);
  if (!SECRET_KEY) return null;

  return hashedValue
    ? CryptoJS.AES.decrypt(hashedValue, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    : null;
};

export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes,
) => {
  if (!SECRET_KEY) return;

  const hashedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  Cookies.set(key, hashedValue, options);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
