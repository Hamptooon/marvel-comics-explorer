import CryptoJS from 'crypto-js';
import { PRIVATE_KEY, PUBLIC_KEY } from './constants';
export const generateAuthParams = () => {
    const timestamp = new Date().getTime();
    const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
    return { timestamp, hash };
  };