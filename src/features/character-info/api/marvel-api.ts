// import axios from 'axios';
// import { generateAuthParams } from '../../../shared/lib/hash';
// import { PUBLIC_KEY } from '../../../shared/lib/constants';
// export const fetchMarvelCharacter = async (characterId: number, signal?: AbortSignal) => {
//   const { timestamp, hash } = generateAuthParams();
//   const params = {
//     ts: timestamp,
//     apikey: PUBLIC_KEY,
//     hash: hash,
//   };

//   return axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}`, {
//     params,
//     signal
//   });
// };


import { httpClient } from '../../../shared/lib/http-client';
import { withMarvelAuth } from '../../../shared/lib/marvel-utils';

export const fetchMarvelCharacter = async (characterId: number, signal?: AbortSignal) => {
  const params = withMarvelAuth({});
  return httpClient.get(`/characters/${characterId}`, { params, signal });
};


//TOODO gateway.marvel.com перенести домен в shared