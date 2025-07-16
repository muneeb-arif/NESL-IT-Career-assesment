import { useEffect, useState } from 'react';
import axios from 'axios';

const cache = {};

export default function useApi(url, options = {}) {
  const [data, setData] = useState(cache[url] || null);
  const [loading, setLoading] = useState(!cache[url]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[url]) return;

    setLoading(true);
    axios(url, options)
      .then(res => {
        cache[url] = res.data;
        setData(res.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
