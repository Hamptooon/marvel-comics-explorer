
// useEffect(() => {
//     const fetchCharacterDetails = async () => {
//       try {
//         const { timestamp, hash } = generateAuthParams();
//         const response = await axios.get(
//           `https://gateway.marvel.com/v1/public/characters/${route.params.characterId}`,
//           {
//             params: {
//               ts: timestamp,
//               apikey: PUBLIC_KEY,
//               hash: hash,
//             },
//           }
//         );
//         setCharacter(response.data.data.results[0]);
//       } catch (error) {
//         console.error('Error fetching character details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCharacterDetails();
//   }, [route.params.characterId]);
import {useState, useCallback, useRef, useEffect} from 'react';
import {CharacterDetails} from '../types';
import {fetchMarvelCharacter} from '../../api/marvel-api';
import axios from 'axios';
export const useCharacter = () => {
  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const getCharacter = useCallback(async (characterId: number) => {
    try {
      const response = await fetchMarvelCharacter(characterId);
      setCharacter(response.data.data.results[0]);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error fetching character details:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    character,
    getCharacter,
  };
};
