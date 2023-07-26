import { forwardRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Icon, Typography } from '@/modules/core/components';
import clsx from 'clsx';

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
      ...props
    },
    ref
  ) => {
    const [previewFile, setPreviewFile] = useState<string | undefined>(
      undefined
    );
    const { getRootProps, getInputProps, open, isDragAccept, isDragReject } =
      useDropzone({
        noClick: !!previewFile,
        noDrag: !!previewFile,
        noKeyboard: !!previewFile,
        accept: {
          'image/jpeg': [],
          'image/png': [],
        },
        maxFiles: 1,
        onDrop: (acceptedFilesDropped) => {
          setPreviewFile(URL.createObjectURL(acceptedFilesDropped[0]));
        },
      });

    return (
      <div>
        <div
          {...getRootProps({
            className: clsx(styles.container, classes?.container, {
              [styles.containerDragAccept]: isDragAccept,
              [styles.containerDragReject]: isDragReject,
              [styles.imageSelectContainer]: !previewFile,
              [styles.imagePreviewContainer]: previewFile,
            }),
            style: {
              width,
              height,
            },
          })}
        >
          {previewFile && (
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
          {!previewFile && (
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
      </div>
    );
  }
);

ImageSelector.displayName = 'ImageSelector';
