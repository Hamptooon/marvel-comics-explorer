// import axios from 'axios';
// import { generateAuthParams } from '../../../shared/lib/hash';
// import { PUBLIC_KEY } from '../../../shared/lib/constants';
// export const fetchMarvelComicbook = async (comicbookId: number, signal?: AbortSignal) => {
//   console.log("Fetching comicbook... ", comicbookId);
//   const { timestamp, hash } = generateAuthParams();
//   const params = {
//     ts: timestamp,
//     apikey: PUBLIC_KEY,
//     hash: hash,
//   };

//   return axios.get(`https://gateway.marvel.com/v1/public/comics/${comicbookId}`, {
//     params,
//     signal
//   });
// };
// export const fetchMarvelCharactersByComicbook = async (comicbookId: number, signal?: AbortSignal) => {
//   const { timestamp, hash } = generateAuthParams();
//   const params = {
//     ts: timestamp,
//     apikey: PUBLIC_KEY,
//     hash: hash,
//   };

//   return axios.get(`https://gateway.marvel.com/v1/public/comics/${comicbookId}/characters`, {
//     params,
//     signal
//   });
// };

// export const fetchMarvelCreatorsByComicbook = async (comicbookId: number, signal?: AbortSignal) => {
//   const { timestamp, hash } = generateAuthParams();
//   const params = {
//     ts: timestamp,
//     apikey: PUBLIC_KEY,
//     hash: hash,
//   };

//   return axios.get(`https://gateway.marvel.com/v1/public/comics/${comicbookId}/creators`, {
//     params,
//     signal
//   });
// };
import { httpClient } from '../../../shared/lib/http-client';
import { withMarvelAuth } from '../../../shared/lib/marvel-utils';
import { Character, Comicbook, MarvelApiResponse } from '../model/types';

export const fetchMarvelComicbook = async (comicbookId: number, signal?: AbortSignal) : Promise<MarvelApiResponse<Comicbook>> => {
  const params = withMarvelAuth({});
  const response = await httpClient.get<MarvelApiResponse<Comicbook>>(`/comics/${comicbookId}`, { params, signal });
  return response.data;
};

export const fetchMarvelCharactersByComicbook = async (comicbookId: number, signal?: AbortSignal): Promise<MarvelApiResponse<Character>> => {
  const params = withMarvelAuth({});
  const response = await httpClient.get<MarvelApiResponse<Character>>(`/comics/${comicbookId}/characters`, { params, signal });
  return response.data;
};

// export const fetchMarvelCreatorsByComicbook = async (comicbookId: number, signal?: AbortSignal) => {
//   const params = withMarvelAuth({});
//   return httpClient.get(`/comics/${comicbookId}/creators`, { params, signal });
// };
