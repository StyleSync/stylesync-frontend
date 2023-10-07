import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

export const useImageInputState = () => {
  // state
  const [file, setFile] = useState<File | null>(null);
  // memo
  const preview = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
  }, [file]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }, []);

  return {
    file,
    preview,
    onChange,
  };
};
