declare module '*.svg?icon' {
  import type { FC, SVGAttributes } from 'react';

  const content: FC<SVGAttributes<SVGElement>>;

  export default content;
}

declare module '*.svg?url' {
  const content: string;

  export default content;
}

// declare module '@editorjs/delimiter' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Delimiter implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): {};
//   }
//   export default Delimiter;
// }

// declare module '@editorjs/header' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';

//   class Header implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): { text: string; level: number };
//   }
//   export default Header;
// }
declare module '@editorjs/header';

// declare module '@editorjs/image' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Image implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): {
//       file: { url: string };
//       caption: string;
//       withBorder: boolean;
//       withBackground: boolean;
//       stretched: boolean;
//     };
//   }
//   export default Image;
// }

declare module '@editorjs/image';

// declare module '@editorjs/list' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class List implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): {
//       items: Array<{ content: string }>;
//       style: 'ordered' | 'unordered';
//     };
//   }
//   export default List;
// }

declare module '@editorjs/list';

// declare module '@editorjs/marker' {
//   import type {
//     InlineTool,
//     InlineToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Marker implements InlineTool {
//     constructor({ api }: InlineToolConstructorOptions);
//     render(): HTMLElement;
//     surround(range: Range): void;
//     checkState(): void;
//     renderActions(): HTMLElement;
//     renderIcon(): string;
//   }
//   export default Marker;
// }

declare module '@editorjs/marker';

// declare module '@editorjs/paragraph' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Paragraph implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): { text: string };
//   }
//   export default Paragraph;
// }

declare module '@editorjs/paragraph';

// declare module '@editorjs/quote' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Quote implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): {
//       text: string;
//       caption: string;
//       alignment: 'left' | 'center';
//     };
//   }
//   export default Quote;
// }

declare module '@editorjs/quote';

// declare module '@editorjs/simple-image' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class SimpleImage implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): { url: string };
//   }
//   export default SimpleImage;
// }

declare module '@editorjs/simple-image';

// declare module '@editorjs/table' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Table implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): { content: string[][] };
//   }
//   export default Table;
// }

declare module '@editorjs/table';

// declare module '@editorjs/warning' {
//   import type {
//     BlockTool,
//     BlockToolConstructorOptions,
//   } from '@editorjs/editorjs';
//   class Warning implements BlockTool {
//     constructor({ data, config, api, readOnly }: BlockToolConstructorOptions);
//     render(): HTMLElement;
//     save(blockContent: HTMLElement): { title: string; message: string };
//   }
//   export default Warning;
// }

declare module '@editorjs/warning';

declare module '@canburaks/text-align-editorjs';

declare module 'editorjs-text-alignment-blocktune';
declare module 'editorjs-text-color-plugin';
declare module 'editorjs-change-case';
declare module 'editorjs-strikethrough';
declare module '@editorjs/underline';
