'use client';
import React, { type FC } from 'react';
import dynamic from 'next/dynamic';

import type { EditorPreviewProps } from './editor-preview.interface';
import 'react-quill/dist/quill.bubble.css';
import './editor-preview.scss';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export const EditorPreview: FC<EditorPreviewProps> = ({ value }) => {
  return <ReactQuill value={value || ''} theme='bubble' readOnly />;
};
