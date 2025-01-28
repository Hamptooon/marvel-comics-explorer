import { useState, useCallback, useRef, useEffect } from 'react';
import { Character } from '../types';
import { fetchMarvelCharacters } from '../../api/marvel-api';
import { BATCH_SIZE } from '../constants';
import axios from 'axios';
export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isFirstLoad = useRef(true);

  const fetchCharacters = useCallback(async (currentOffset: number) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetchMarvelCharacters(currentOffset, abortControllerRef.current.signal);
      const filteredCharacters = response.data.results.filter(
        (character: Character) =>
          character.thumbnail && !character.thumbnail.path.includes('image_not_available')
      );

      if (currentOffset === 0) {
        setCharacters(filteredCharacters);
      } else {
        setCharacters(prev => [...prev, ...filteredCharacters]);
      }
      
      setOffset(currentOffset + BATCH_SIZE);
      setHasMore(response.data.count === BATCH_SIZE);
      isFirstLoad.current = false;

    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error loading characters:', error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);
  // TODO: http клиент (в shared) сделать синглтон axios, настроить axios config
  useEffect(() => {
    fetchCharacters(0);
  }, []);

  const loadMoreCharacters = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchCharacters(offset);
    }
  }, [loadingMore, hasMore, offset]);

  return {
    characters,
    loading,
    loadingMore,
    hasMore,
    loadMoreCharacters
  };
};