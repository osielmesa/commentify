import { useState, useEffect } from 'react';
import { mockArticlesHttpCalls } from '../services/articles';

const TIME_OUT: number = 1000;

const useFetch = (url: string, options?: {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCall = async () => {
      try {
        let json;
        if (options?.mockArticles) {
          json = await mockArticlesHttpCalls(url, TIME_OUT); // Mocking articles/ endpoint response
        } else {
          const res = await fetch(url, options);
          json = await res.json();
        }
        setResponse(json);
      } catch (e) {
        setError(e);
      }
    };
    fetchCall();
  }, []);

  return { response, error };
};

export default useFetch;
