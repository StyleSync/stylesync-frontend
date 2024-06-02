'use client';

import React, { type FC, useEffect, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
// types
import { type EditorProps } from './editor';

export const EditorComponent: FC<EditorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const editorInstance = useRef<EditorJS | null>(null);

  const onSave = useCallback(async () => {
    if (!editorInstance.current) return;

    const data = await editorInstance.current.save();

    onChange(JSON.stringify(data.blocks));
  }, [onChange]);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        placeholder: readOnly ? '' : "Let's take a note!",

        onChange: readOnly ? undefined : onSave,
        data: JSON.parse(value),
        readOnly,

        tools: {
          header: {
            // @ts-ignore
            class: Header,
            config: {
              placeholder: 'Enter a header',
              level: [2],
              defaultLevel: 6,
            },
          },
          delimiter: {
            class: Delimiter,
            config: {},
          },

          list: {
            class: List,
            config: {
              data: {},
              readOnly: false,
            },
          },
          marker: {
            class: Marker,
            config: {},
          },
          paragraph: {
            class: Paragraph,
            config: {},
          },
          quote: {
            class: Quote,
            config: {},
          },

          table: {
            class: Table,
            config: {},
          },
        },
      });
    }

    console.log(editorInstance.current);

    // Cleanup function to destroy the editor instance when the component unmounts
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [value, onSave, readOnly]);

  return (
    <div
      id='editorjs'
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
};
