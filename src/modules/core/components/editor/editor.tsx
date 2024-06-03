import React, { type FC, useEffect, useRef, useCallback } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import AlignmentTuneTool from 'editorjs-text-alignment-blocktune';
import ColorPlugin from 'editorjs-text-color-plugin';
import ChangeCase from 'editorjs-change-case';
import Strikethrough from 'editorjs-strikethrough';
import Underline from '@editorjs/underline';
// types
import { type EditorProps } from './editor.interface';

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
          textAlignment: {
            class: AlignmentTuneTool,
            config: {
              default: 'left',
              blocks: {
                header: 'center',
              },
            },
          },
          underline: Underline,
          list: {
            class: List,
            inlineToolbar: true,
          },

          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ['textAlignment'],
          },
          paragraph: {
            class: Paragraph,
            tunes: ['textAlignment'],
          },
          table: {
            class: Table,
            config: {},
          },
          strikethrough: {
            class: Strikethrough,
            shortcut: 'CMD+SHIFT+X',
          },
          ChangeCase: {
            class: ChangeCase,
            config: {
              showLocaleOption: true,
              locale: 'tr',
            },
          },
          Color: {
            class: ColorPlugin,
            config: {
              colorcollections: [
                '#1899D6',
                '#57D39E',
                '#FFAC5D',
                '#FD6E5F',
                '#394247',
              ],
              defaultcolor: '#1899D6',
              type: 'text',
              customPicker: true,
            },
          },

          // Marker: {
          //   class: ColorPlugin,
          //   config: {
          //     defaultColor: '#FFBF00',
          //     type: 'marker',
          //     icon: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="200" height="200" viewBox="0 0 32 32">
          //     <path d="M17.6 6 6.9 16.7c-.2.2-.3.4-.3.6L6 23.9c0 .3.1.6.3.8.2.2.4.3.7.3h.1l6.6-.6c.2 0 .5-.1.6-.3L25 13.4 17.6 6zM26.4 12l1.4-1.4c1.2-1.2 1.1-3.1-.1-4.3l-3-3c-.6-.6-1.3-.9-2.2-.9-.8 0-1.6.3-2.2.9L19 4.6l7.4 7.4zM28 29H4c-.6 0-1-.4-1-1s.4-1 1-1h24c.6 0 1 .4 1 1s-.4 1-1 1z"/>
          //   </svg>`,
          //   },
          // },
          Marker: {
            class: Marker,
          },
        },
      });
    }

    // Cleanup function to destroy the editor instance when the component unmounts
    // return () => {
    //   if (editorInstance.current) {
    //     editorInstance.current.destroy();
    //     editorInstance.current = null;
    //   }
    // };
  }, [value, onSave, readOnly, id]);

  return (
    <div
      id={id}
      className='rounded-lg border border-gray p-2'
      style={{
        height: fixedHeight,
        overflowY: fixedHeight ? 'auto' : undefined,
        zIndex: 0,
      }}
    />
  );
};
