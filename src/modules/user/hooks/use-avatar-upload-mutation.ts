import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { upload } from '@vercel/blob/client';
import type { PutBlobResult } from '@vercel/blob';

const AVATAR_UPLOAD_CACHE_KEY = 'AVATAR_UPLOAD';

export const useAvatarUploadMutation = (
  options?: UseMutationOptions<PutBlobResult, Error, File>
) => {
  return useMutation<PutBlobResult, Error, File>(
    [AVATAR_UPLOAD_CACHE_KEY],
    async (file: File) => {
      return upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });
    },
    options
  );
};
