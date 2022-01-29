import { useState, useEffect } from 'react';
const useUploadFile = (
  file: File | null,
): [
  data: { key: string; message: string; url: string } | null,
  loading: boolean,
  error: Error | null,
] => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('upload', file);
      const url = 'https://drijfvuil-api.onrender.com/files/upload';

      const options = {
        method: 'post',
        body: formData,
      };

      if (url && options) {
        fetch(url, options)
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
    }
  }, [file]);
  return [response, loading, error];
};

export default useUploadFile;
