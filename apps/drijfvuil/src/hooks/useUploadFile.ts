import { useState, useEffect } from 'react';

const BASE_URL = 'https://drijfvuil-api.onrender.com/files/upload';

/**
 * Helper function to handle renaming files
 *
 * @param {File} originalFile
 * @param {string} newName
 * @return {*} {File}
 */
const renameFile = (originalFile: File, newName: string): File => {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};

/**
 * Upload file hook
 * uses fetch POST request to upload File, then returns the fetch response object
 *
 * @param {(File | null)} file
 * @return {*}  {([
 *   data: { key: string; message: string; url: string } | null,
 *   loading: boolean,
 *   error: Error | null,
 * ])}
 */
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
      const formData = new FormData();
      const fileNamePrefix = new Date().toUTCString();
      const fetchOptions = {
        method: 'post',
        body: formData,
      };

      setLoading(true);

      // Set form data, change file name before appending form data
      formData.append(
        'upload',
        renameFile(file, `${fileNamePrefix}${file.name}`),
      );

      // Upload the file
      if (BASE_URL && fetchOptions) {
        fetch(BASE_URL, fetchOptions)
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
