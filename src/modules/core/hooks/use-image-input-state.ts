import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

export const useImageInputState = (initial?: File | string | null) => {
  // state
  const [file, setFile] = useState<File | string | null>(initial ?? null);
  // memo
  const preview = useMemo(() => {
    if (file && typeof file === 'object') return URL.createObjectURL(file);

    if (typeof file === 'string') return file;
  }, [file]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }, []);

  const onRemove = useCallback(() => {
    setFile(null);
  }, []);

  return {
    file,
    preview,
    onChange,
    onRemove,
  };
};
