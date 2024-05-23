import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Delimiter from '@editorjs/delimiter';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';

export const EditorComponent = () => {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        placeholder: "Let's take a note!",

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
          warning: {
            class: Warning,
            // inlineToolbar: true,
            config: {
              // titlePlaceholder: 'Title',
              // messagePlaceholder: 'Message',
            },
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
  }, []);

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
