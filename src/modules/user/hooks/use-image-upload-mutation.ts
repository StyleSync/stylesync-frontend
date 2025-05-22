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
  return useMutation({
    mutationKey: [AVATAR_UPLOAD_CACHE_KEY],
    mutationFn: async (file: { name: string; blob: Blob }) => {
      return upload(file.name, file.blob, {
        access: 'public',
        handleUploadUrl: '/api/portfolio/upload',
      });
    },
    ...options,
  });
};
