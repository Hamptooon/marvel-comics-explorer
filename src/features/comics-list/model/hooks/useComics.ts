import { useState, useCallback, useRef, useEffect } from 'react';
import { Comicbook } from '../types';
import { fetchMarvelComics } from '../../api/marvel-api';
import { BATCH_SIZE } from '../constants';
import axios from 'axios';
export const useComics = () => {
  const [comics, setComics] = useState<Comicbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isFirstLoad = useRef(true);

  const fetchComics = useCallback(async (currentOffset: number) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const response = await fetchMarvelComics(currentOffset, abortControllerRef.current.signal);
      const filteredComics = response.data.results.filter(
        (comicbook: Comicbook) =>
            comicbook.thumbnail && !comicbook.thumbnail.path.includes('image_not_available')
      );

      if (currentOffset === 0) {
        setComics(filteredComics);
      } else {
        setComics(prev => [...prev, ...filteredComics]);
      }
      
      setOffset(currentOffset + BATCH_SIZE);
      setHasMore(response.data.count === BATCH_SIZE);
      isFirstLoad.current = false;

    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error loading comics:', error);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchComics(0);
  }, []);

  const loadMoreComics = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchComics(offset);
    }
  }, [loadingMore, hasMore, offset]);

  return {
    comics,
    loading,
    loadingMore,
    hasMore,
    loadMoreComics
  };
};