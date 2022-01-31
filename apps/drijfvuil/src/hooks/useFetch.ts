import React, { useEffect, useState } from 'react';

const useFetch = (
  url: string,
  opts: {
    method: string;
    headers: {
      'Content-Type': string;
      Accept: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any | null;
  },
): [data: Response | null, loading: boolean, error: Error | null] => {
  const [response, setResponse] = useState(new Response());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (url && opts) {
      fetch(url, opts)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [url, opts]);
  return [response, loading, error];
};

export default useFetch;
