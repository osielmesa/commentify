import { useState, useEffect } from 'react';
import { mockArticlesHttpCalls } from '../services/articles';
import { mockCommentsHttpCalls } from '../services/comments';

const TIME_OUT: number = 50; //milliseconds

const useFetch = (url: string, options?: {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCall = async () => {
      try {
        let json;
        if (options?.mockArticles) {
          json = await mockArticlesHttpCalls(url, TIME_OUT); // Mocking articles/ endpoint response
        } else if (options?.mockComments) {
          // Mocking comments/ endpoint response
          if (options?.mockComments.selectedArticle) {
            json = await mockCommentsHttpCalls(
              url,
              options.mockComments.selectedArticle.id,
              TIME_OUT,
            );
          } else {
            json = [];
          }
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
