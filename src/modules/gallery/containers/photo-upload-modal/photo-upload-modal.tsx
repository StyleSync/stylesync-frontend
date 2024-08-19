import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { Cropper, type CropperRef } from 'react-advanced-cropper';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { animated, useSpringValue } from '@react-spring/web';
import { useIntl } from 'react-intl';

// components
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
import { Avatar } from '@/modules/core/components/avatar';
import { TextField } from '@/modules/core/components/text-field';
import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useImageUploadMutation } from '@/modules/user/hooks/use-image-upload-mutation';
// utils
import { getFullName } from '@/modules/user/utils/user.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
import { dataURLtoBlob } from '@/modules/core/utils/file.utils';

import 'react-advanced-cropper/dist/style.css';
import 'react-advanced-cropper/dist/themes/bubble.css';

import { PhotoUploadModalHeader } from './elements/photo-upload-modal-header';

import type {
  PhotoUploadState,
  PhotoUploadModalProps,
} from './photo-upload-modal.interface';
import { Spinner } from '@/modules/core/components/spinner';
import Image from 'next/image';

export const PhotoUploadModal: FC<PhotoUploadModalProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  portfolioId,
  albumId,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  // queries
  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const uploadedPortfolio = trpc.portfolio.get.useQuery(
    {
      id: portfolioId || '',
    },
    {
      enabled: !!portfolioId && isOpen,
    }
  );
  // animation
  const springs = useSpringValue(0);
  // state
  const [photoUploadState, setPhotoUploadState] = useState<PhotoUploadState>({
    step: portfolioId ? 'preview' : 'select',
  });
  const [description, setDescription] = useState('');
  // refs
  const cropperRef = useRef<CropperRef>(null);
  // mutations
  const uploadMutation = useImageUploadMutation();
  const portfolioCreateMutation = trpc.portfolio.create.useMutation();
  const portfolioUpdateMutation = trpc.portfolio.update.useMutation();

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    disabled: photoUploadState.step !== 'select',
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFilesDropped) => {
      if (acceptedFilesDropped.length) {
        setPhotoUploadState({
          step: 'crop',
          file: acceptedFilesDropped[0],
          preview: URL.createObjectURL(acceptedFilesDropped[0]),
        });
      }
    },
  });

  useEffect(() => {
    if (portfolioId && uploadedPortfolio.data) {
      setDescription(uploadedPortfolio.data.description || '');
    }
  }, [uploadedPortfolio.data, portfolioId]);

  useEffect(() => {
    if (
      photoUploadState.step === 'details' ||
      photoUploadState.step === 'preview'
    ) {
      const DETAILS_WIDTH = 350;

      springs.start(DETAILS_WIDTH);
    } else {
      springs.start(0);
    }
  }, [photoUploadState.step, springs]);

  const handleNextClick = () => {
    setPhotoUploadState((prevState) => {
      if (prevState.step === 'crop') {
        if (!cropperRef.current) return prevState;

        const dataURL = cropperRef.current.getCanvas()?.toDataURL();

        if (!dataURL) return prevState;

        return {
          step: 'details',
          file: prevState.file,
          preview: prevState.preview,
          editedPreview: dataURL,
        };
      }

      return { step: 'select' };
    });
  };

  const handleBackClick = async () => {
    setPhotoUploadState((prevState) => {
      if (prevState.step === 'details') {
        return {
          step: 'crop',
          file: prevState.file,
          preview: prevState.preview,
        };
      }

      if (prevState.step === 'crop') {
        URL.revokeObjectURL(prevState.preview);
      }

      return { step: 'select' };
    });
  };

  const handleSaveClick = async () => {
    if (
      portfolioId &&
      uploadedPortfolio.data &&
      photoUploadState.step === 'preview'
    ) {
      portfolioUpdateMutation.mutate(
        {
          id: portfolioId,
          title: uploadedPortfolio.data.title,
          description,
        },
        {
          onError: () => {
            showToast({
              variant: 'error',
              title: intl.formatMessage({
                id: 'photo.upload.modal.toast.error.title',
              }),
              description: intl.formatMessage({
                id: 'photo.upload.modal.toast.error.description',
              }),
            });
          },
          onSuccess: () => {
            showToast({
              variant: 'success',
              title: intl.formatMessage({
                id: 'photo.upload.modal.toast.success.title',
              }),
              description: intl.formatMessage({
                id: 'photo.upload.modal.toast.success.description',
              }),
            });

            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.portfolio.get),
            });

            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.album.list),
            });

            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.portfolio.list),
            });

            onOpenChange(false);
          },
        }
      );

      return;
    }

    if (photoUploadState.step !== 'details') {
      return;
    }

    const uploadedImage = await uploadMutation.mutateAsync({
      name: photoUploadState.file.name,
      blob: dataURLtoBlob(photoUploadState.editedPreview),
    });

    portfolioCreateMutation.mutate(
      {
        title: photoUploadState.file.name,
        link: uploadedImage.url,
        description,
        albumId: albumId || '',
      },
      {
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({
              id: 'photo.modal.upload.toast.error.title',
            }),
            description: intl.formatMessage({
              id: 'photo.modal.upload.toast.error.description',
            }),
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'photo.modal.upload.toast.success.title',
            }),
            description: intl.formatMessage({
              id: 'photo.modal.upload.toast.success.description',
            }),
          });

          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.portfolio.list),
          });

          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.album.list),
          });

          onOpenChange(false);
        },
      }
    );
  };

  const handleOpenChange = useCallback(
    (_open: boolean) => {
      if (_open) {
        setPhotoUploadState({ step: portfolioId ? 'preview' : 'select' });

        if (!portfolioId) {
          setDescription('');
        }
      }

      onOpenChange(_open);
    },
    [onOpenChange, portfolioId]
  );

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      isCloseButtonVisible={
        photoUploadState.step === 'select' ||
        photoUploadState.step === 'preview'
      }
    >
      <div className='flex flex-col overflow-hidden rounded-xl'>
        <PhotoUploadModalHeader
          state={photoUploadState}
          onBackClick={handleBackClick}
          onNextClick={handleNextClick}
          onSaveClick={handleSaveClick}
          isSaveLoading={
            uploadMutation.isLoading ||
            portfolioCreateMutation.isLoading ||
            portfolioUpdateMutation.isLoading
          }
        />
        <div className='flex h-[70vh]'>
          <div
            {...getRootProps({
              className:
                'aspect-square relative h-full flex flex-col gap-y-6 justify-center items-center',
            })}
          >
            {photoUploadState.step === 'select' && (
              <>
                <Icon
                  name='media'
                  width={96}
                  className={clsx({
                    invert: isDragAccept,
                  })}
                />
                <div className='flex flex-col items-center gap-y-2'>
                  <Typography variant='subtitle' className='text-dark'>
                    {intl.formatMessage({ id: 'photo.modal.upload.dropHere' })}
                  </Typography>
                  <Typography variant='body2' className='!text-gray'>
                    {intl.formatMessage({ id: 'photo.modal.upload.supports' })}
                  </Typography>
                </div>
                <Button
                  variant='primary'
                  text={intl.formatMessage({
                    id: 'button.select.from.computer',
                  })}
                />
                <input {...getInputProps()} />
              </>
            )}
            {photoUploadState.step === 'crop' && (
              <Cropper
                ref={cropperRef}
                className='h-full w-full'
                src={photoUploadState.preview}
              />
            )}
            {photoUploadState.step === 'details' && (
              <div className='h-full w-full bg-black'>
                <Image
                  className='flex h-full w-full object-contain'
                  src={photoUploadState.editedPreview}
                  width={100}
                  height={100}
                  alt='image'
                />
              </div>
            )}
            {photoUploadState.step === 'preview' && (
              <div className='relative h-full w-full bg-black'>
                <Placeholder
                  isActive={uploadedPortfolio.isLoading}
                  className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                  placeholder={<Spinner size='medium' color='#fff' />}
                >
                  {uploadedPortfolio.data && (
                    <Image
                      className='flex h-full w-full object-contain'
                      src={uploadedPortfolio.data.link}
                      width={100}
                      height={100}
                      alt='image'
                    />
                  )}
                </Placeholder>
              </div>
            )}
          </div>
          <animated.div
            style={{ width: springs }}
            className='flex h-full w-0 bg-transparent'
          >
            <div className='flex flex-1 flex-col gap-y-4 p-4'>
              <div className='flex items-center gap-x-2'>
                <Avatar size={32} url={me?.avatar} />
                <Typography weight='medium'>{getFullName(me || {})}</Typography>
              </div>
              <TextField
                variant='textarea'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Write a caption...'
                className='h-full !resize-none !rounded !p-0'
                classes={{
                  container: 'flex-1',
                  fieldset: '!hidden',
                }}
              />
            </div>
          </animated.div>
        </div>
      </div>
    </Dialog>
  );
};
