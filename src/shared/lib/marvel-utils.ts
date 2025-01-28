// import { httpClient } from '../../../shared/lib/http-client';
import { generateAuthParams } from './hash';
import { PUBLIC_KEY } from './constants';

export const withMarvelAuth = (params: Record<string, any>) => {
  const { timestamp, hash } = generateAuthParams();
  return {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash,
    ...params,
  };
};