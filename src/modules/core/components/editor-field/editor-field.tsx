import React, { type FC, useRef } from 'react';
import clsx from 'clsx';
import ReactQuill from 'react-quill';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// styles
import 'react-quill/dist/quill.snow.css';

import styles from './editor-field.module.scss';
import './editor-field.scss';

import { type EditorProps } from './editor-field.interface';

export const isEditorFieldEmpty = (value: string) => {
  return (
    value.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
    !value.includes('<img')
  );
};

export const EditorField: FC<EditorProps> = ({
  // id,
  value,
  onChange,
  label,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='relative mt-2 flex flex-col gap-y-2 rounded-3xl'
      ref={rootRef}
    >
      <div className={clsx('flex w-full', {})}>
        <ReactQuill
          theme='snow'
          value={value}
          readOnly={false}
          onChange={onChange}
          className='h-fit w-full'
        />
      </div>
      {label && <label className={clsx(styles.label)}>{label}</label>}
      <fieldset className={clsx(styles.fieldset)}>
        <legend className={styles.legend}>
          {!!label && <Typography>{label}</Typography>}
        </legend>
      </fieldset>
    </div>
  );
};
