import { forwardRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ImageSelectorProps } from './image-selector.interface';
import styles from './image-selector.module.scss';

export const ImageSelector = forwardRef<HTMLInputElement, ImageSelectorProps>(
  (
    {
      label,
      classes,
      width = 150,
      height = 150,
      placeholder,
      children,
      disablePreview,
      onImageSelected,
      ...props
    },
    ref
  ) => {
    const [previewFile, setPreviewFile] = useState<string | undefined>(
      undefined
    );
    const { getRootProps, getInputProps, open, isDragAccept, isDragReject } =
      useDropzone({
        noClick: !!previewFile && !disablePreview,
        noDrag: !!previewFile && !disablePreview,
        noKeyboard: !!previewFile && !disablePreview,
        accept: {
          'image/jpeg': [],
          'image/png': [],
        },
        maxFiles: 1,
        onDrop: (acceptedFilesDropped) => {
          setPreviewFile(URL.createObjectURL(acceptedFilesDropped[0]));
          onImageSelected && onImageSelected(acceptedFilesDropped);
        },
      });

    return (
      <div
        {...getRootProps({
          className: clsx(styles.container, classes?.container, {
            [styles.containerDragAccept]: isDragAccept,
            [styles.containerDragReject]: isDragReject,
            [styles.imageSelectContainer]: !previewFile || disablePreview,
            [styles.imagePreviewContainer]: previewFile && !disablePreview,
          }),
          style: {
            width,
            height,
          },
        })}
      >
        {previewFile && !disablePreview && (
          <>
            <div className={styles.actionContainer}>
              <button
                className={styles.actionButton}
                onClick={() => setPreviewFile(undefined)}
              >
                <Icon name='close' />
              </button>
              <button className={styles.actionButton} onClick={open}>
                <Icon name='pencil' />
              </button>
            </div>
            <Image
              className={styles.imagePreview}
              width={width}
              height={height}
              src={previewFile}
              alt='File preview'
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(previewFile);
              }}
            />
          </>
        )}
        {(!previewFile || disablePreview) && (
          <>
            <Typography
              As='div'
              variant='body2'
              className={clsx(styles.label, classes?.label)}
            >
              {label}
            </Typography>
            {children ?? <Typography>{placeholder}</Typography>}
          </>
        )}
        <input ref={ref} {...getInputProps()} {...props} />
      </div>
    );
  }
);

ImageSelector.displayName = 'ImageSelector';
