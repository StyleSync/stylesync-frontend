import React, { type FC, useEffect, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import editorJsParser from 'editorjs-html';
// types
import { type EditorProps } from './editor.interface';

const parser = editorJsParser();

export const EditorJsPreview: FC<{ value?: string }> = ({ value }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !value) {
      return;
    }

    const html = parser.parse({ blocks: JSON.parse(value) });

    rootRef.current.innerHTML = html.join('');
  }, [value]);

  if (!value) return;

  return <div ref={rootRef} />;
};

export const EditorComponent: FC<EditorProps> = ({
  id,
  value,
  onChange,
  readOnly = false,
  fixedHeight,
}) => {
  const editorInstance = useRef<EditorJS | null>(null);

  const onSave = useCallback(async () => {
    if (!editorInstance.current) return;

    const data = await editorInstance.current.save();

    onChange && onChange(JSON.stringify(data.blocks));
  }, [onChange]);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: id,
        placeholder: readOnly ? '' : "Let's take a note!",

        onChange: readOnly ? undefined : onSave,
        data: value
          ? {
              blocks: JSON.parse(value),
            }
          : undefined,
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

    // Cleanup function to destroy the editor instance when the component unmounts
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [value, onSave, readOnly, id]);

  return (
    <div
      id={id}
      className='rounded-lg border border-gray p-2'
      style={{
        height: fixedHeight,
        overflowY: fixedHeight ? 'auto' : undefined,
      }}
    />
  );
};
