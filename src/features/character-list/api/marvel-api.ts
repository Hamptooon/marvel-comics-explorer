// import axios from 'axios';
// import { generateAuthParams } from '../../../shared/lib/hash';
// import { PUBLIC_KEY } from '../../../shared/lib/constants';
// import { BATCH_SIZE } from '../model/constants';
// export const fetchMarvelCharacters = async (offset: number, signal?: AbortSignal) => {
//   const { timestamp, hash } = generateAuthParams();
//   const params = {
//     ts: timestamp,
//     apikey: PUBLIC_KEY,
//     hash: hash,
//     limit: BATCH_SIZE,
//     offset: offset
//   };

//   return axios.get('https://gateway.marvel.com/v1/public/characters', {
//     params,
//     signal
//   });
// };

import { httpClient } from '../../../shared/lib/http-client';
import { withMarvelAuth } from '../../../shared/lib/marvel-utils';
import { BATCH_SIZE } from '../model/constants';
import { Character, MarvelApiResponse } from '../model/types';

export const fetchMarvelCharacters = async (offset: number, signal?: AbortSignal) : Promise<MarvelApiResponse<Character>> => {
  const params = withMarvelAuth({ limit: BATCH_SIZE, offset });
  const response = await httpClient.get<MarvelApiResponse<Character>>('/characters', { params, signal });
  return response.data;
};
