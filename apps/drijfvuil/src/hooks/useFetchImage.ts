import { useEffect, useState } from 'react';
import { useGetPresignedImageUrlMutation } from '@drijfvuil-ws/data-access';

const useFetchImage = (id: string) => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const updateImageInput = { id: id };

  const [getPresignedImageUrl] = useGetPresignedImageUrlMutation({
    variables: { updateImageInput: updateImageInput },
  });

  useEffect(() => {
    setLoading(true);
    getPresignedImageUrl()
      .then((res) => {
        if (res.data?.getPresignedImageUrl.url) {
          setUrl(res.data.getPresignedImageUrl.url);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [getPresignedImageUrl]);

  return { url, loading, error };
};

export default useFetchImage;
