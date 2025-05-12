import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';

const AVATAR_UPLOAD_CACHE_KEY = 'IMAGE_UPLOAD';

export const useImageUploadMutation = (
  options?: UseMutationOptions<
    PutBlobResult,
    Error,
    { name: string; blob: Blob }
  >
) => {
  return useMutation<PutBlobResult, Error, { name: string; blob: Blob }>(
    [AVATAR_UPLOAD_CACHE_KEY],
    async (file) => {
      return upload(file.name, file.blob, {
        access: 'public',
        handleUploadUrl: '/api/portfolio/upload',
      });
    },
    options
  );
};
